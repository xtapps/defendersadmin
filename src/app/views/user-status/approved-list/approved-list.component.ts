import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { RejectReasonModalComponent } from '../modals/reject-reason-modal/reject-reason-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { PAGINATION } from 'src/assets/app-constant';
import { DefenderModel } from '../model/defender.model';

@Component({
  selector: 'app-approved-list',
  templateUrl: './approved-list.component.html',
  styleUrls: ['./approved-list.component.scss']
})
export class ApprovedListComponent extends DefenderModel implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  approvedList: any[] = [];
  limit = PAGINATION.limit;
  offset = PAGINATION.offset;
  totalRecords = 0;
  isLoading = false
  userType: number = 0;
  searchText: any = '';

  constructor(
    private adminService: AdminService,
    public override router: Router,
    private dialog: MatDialog
  ) {
    super(router)
  }

  ngOnInit(): void {
    this.getApprovedList();
  }

  getApprovedList(): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.getUserStatus(2, this.limit, this.offset, this.userType, this.searchText).pipe(
        finalize(() => { this.isLoading = false })
      ).subscribe(res => {
        this.approvedList = res.defendersList;
        this.totalRecords = res.totalCount;
      })
    );
  }

  deleteItem(id: string): void {
    var userResponse = confirm("Do you want to proceed?");
    if (userResponse) {
      alert("You chose to proceed!");
      this.onDelete(id);
    }
  }

  onDelete(id: string): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.deleteUser({id}).pipe(
        finalize(() => {this.isLoading = false;})
      ).subscribe(res => {
        this.getApprovedList();
      }, err => {
        if (err.status === 201) {
          this.getApprovedList();
        }
      })
    )
  }

  getChange(event: any, item: any): void {
    const userResponse = confirm(`Are you to proceed ${event.target.value  === '3' ? 'reject' : 'suspend'}?`);
    if (userResponse) {
      this.openModal(event.target.value, item);
    }
  }

  openModal(event: any, item: any): void {
    const modal = this.dialog.open(RejectReasonModalComponent, {
      width: '500px',
      disableClose: true,
      data:{
        id: item._id,
        status: event
      }
    });
    modal.afterClosed().subscribe(res => {
      if(res.success){
        this.getApprovedList();
      }
    })
  }

  selectTab(userType: number) {
    this.offset = 0;
    this.userType = userType;
    this.getApprovedList();
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getApprovedList();
  }

  applyFilter(text: any) {
    this.searchText = text
    this.getApprovedList();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
