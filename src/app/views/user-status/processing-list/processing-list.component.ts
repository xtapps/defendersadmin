import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { RejectReasonModalComponent } from '../modals/reject-reason-modal/reject-reason-modal.component';
import { DefenderModel } from '../model/defender.model';

@Component({
  selector: 'app-processing-list',
  templateUrl: './processing-list.component.html',
  styleUrls: ['./processing-list.component.scss']
})
export class ProcessingListComponent extends DefenderModel implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  processingList: any[] = [];
  limit = 13;
  offset = 0;
  totalRecords = 0;
  isLoading = false;
  searchText: any = '';

  constructor(
    private adminService: AdminService,
    public override router: Router,
    private dialog: MatDialog
  ) {
    super(router)
  }

  ngOnInit(): void {
    this.getProcessingList();
  }

  getProcessingList(): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.getUserStatus(0, this.limit, this.offset, undefined, this.searchText, 'asc-processing').pipe(
        finalize(() => { this.isLoading = false })
      ).subscribe(res => {
        this.processingList = res.defendersList;
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
        finalize(() => { this.isLoading = false; })
      ).subscribe(res => {
        this.getProcessingList();
      }, err => {
        if (err.status === 201) {
          this.getProcessingList();
        }
      })
    )
  }

  getChange(event: any, item: any): void {
    const userResponse = confirm(`Are you sure to ${event.target.value == 2 ? 'approve' : 'reject'}?`);
    if (userResponse) {
      this.openModal(event.target.value, item);
    }
  }

  openModal(event: any, item: any): void {
    const modal = this.dialog.open(RejectReasonModalComponent, {
      width: '500px',
      disableClose: true,
      data: {
        id: item._id,
        status: event
      }
    })
    modal.afterClosed().subscribe(res => {
      if (res.success) {
        this.getProcessingList();
      }
    })
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getProcessingList();
  }

  applyFilter(text: any) {
    this.searchText = text
    this.getProcessingList();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }
}
