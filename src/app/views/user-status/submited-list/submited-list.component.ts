import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { RejectReasonModalComponent } from '../modals/reject-reason-modal/reject-reason-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../modals/image-modal/image-modal.component';
import { DefenderModel } from '../model/defender.model';

@Component({
  selector: 'app-submited-list',
  templateUrl: './submited-list.component.html',
  styleUrls: ['./submited-list.component.scss']
})
export class SubmitedListComponent extends DefenderModel implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  submitedList: any[] = [];
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
    this.getSubmitedList();
  }

  getSubmitedList(): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.getUserStatus(1, this.limit, this.offset, undefined, this.searchText, 'asc-processing').pipe(
        finalize(() => { this.isLoading = false })
      ).subscribe(res => {
        this.submitedList = res.defendersList;
        this.totalRecords = res.totalCount;
      })
    );
  }

  deleteItem(id: string): void {
    var userResponse = confirm("Do you want to proceed?");
    if (userResponse) {
      this.onDelete(id);
    }
  }

  onDelete(id: string): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.deleteUser({id}).pipe(
        finalize(() => { this.isLoading = false; })
      ).subscribe(res => {
        this.getSubmitedList();
      }, err => {
        if (err.status === 201) {
          this.getSubmitedList();
        }
      })
    )
  }

  getChange(event: Event, item: any): void {
    const selectedValue = event.target as HTMLInputElement;
    console.log(selectedValue.value);

    const userResponse = confirm(`Are you sure to proceed ${selectedValue.value}?`);
    if (userResponse) {
      if (selectedValue.value === 'approve') {
        const data = {
          userId: item._id,
          userStatus: '2',
        }
        this.updateUserStatus(data);
      } else if (selectedValue.value === 'reject') {
        const data = {
          userId: item._id,
          userStatus: '3',
        }
        this.openRejectModal(data);
      }
    }
  }

  openRejectModal(item: any): void {
    const modal = this.dialog.open(RejectReasonModalComponent, {
      width: '500px',
      disableClose: true,
      data: {
        id: item.userId,
        status: item.userStatus
      }
    });
    modal.afterClosed().subscribe(res => {
      if (res.success) {
        this.getSubmitedList();
      }
    })
  }

  updateUserStatus(data: any): void {
    this.subscription.push(
      this.adminService.updateUserStatus(data).subscribe(res => {
        this.getSubmitedList();
      })
    );
  }

  downloadDoc(defenderDocument: string) {
    const urlSub = this.adminService.getProtectedS3Url(defenderDocument).subscribe(res => {
      this.dialog.open(ImageModalComponent, {
        width: '50%',
        data: {
          url: res.newUrl
        }
      });
    }, err => {
      console.log(err);
    });

    this.subscription.push(urlSub);
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getSubmitedList();
  }

  applyFilter(text: any) {
    this.searchText = text;
    this.offset = 0;
    this.adminService.searchTextChanged.next(true);
    this.getSubmitedList();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
