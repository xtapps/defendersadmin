import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { RejectReasonModalComponent } from '../modals/reject-reason-modal/reject-reason-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../modals/image-modal/image-modal.component';

@Component({
  selector: 'app-submited-list',
  templateUrl: './submited-list.component.html',
  styleUrls: ['./submited-list.component.scss']
})
export class SubmitedListComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  submitedList: any[] = [];
  limit = 13;
  offset = 0;
  totalRecords = 0;
  isLoading = false

  constructor(
    private adminService: AdminService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getSubmitedList();
  }

  getSubmitedList(): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.getUserStatus(1, this.limit, this.offset).pipe(
        finalize(() => { this.isLoading = false })
      ).subscribe(res => {
        this.submitedList = res.defendersList;
        this.totalRecords = res.totalCount;
      })
    );
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.submitedList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'submited' } });
  }

  previousClickEvent(event: boolean): void {
    if (this.offset > 0 && event) {
      this.offset -= 1;
      this.getSubmitedList();
    }
  }

  nextClickEvent(event: boolean): void {
    if (event) {
      this.offset += 1;
      this.getSubmitedList();
    }
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
      this.adminService.deleteProperties(id).pipe(
        finalize(() => { this.isLoading = false; })
      ).subscribe(res => {
        if (res.success) {
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

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
