import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { DefenderModel } from '../model/defender.model';

@Component({
  selector: 'app-suspended-list',
  templateUrl: './suspended-list.component.html',
  styleUrls: ['./suspended-list.component.scss']
})
export class SuspendedListComponent extends DefenderModel implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  suspendedList: any[] = [];
  limit = 13;
  offset = 0;
  totalRecords = 0;
  isLoading = false;
  searchText: any = '';

  constructor(
    private adminService: AdminService,
    public override router: Router
  ) {
    super(router)
  }

  ngOnInit(): void {
    this.getSuspendedList();
  }

  getSuspendedList(): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.getUserStatus(4, this.limit, this.offset, undefined, this.searchText).pipe(
        finalize(() => { this.isLoading = false })
      ).subscribe(res => {
        this.suspendedList = res.defendersList;
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
        finalize(() => {this.isLoading = false;})
      ).subscribe(res => {
        this.getSuspendedList();
      }, err => {
        if (err.status === 201) {
          this.getSuspendedList();
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
      }
    }
  }

  updateUserStatus(data: any): void {
    this.subscription.push(
      this.adminService.updateUserStatus(data).subscribe(res => {
        this.getSuspendedList();
      })
    );
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getSuspendedList();
  }

  applyFilter(text: any) {
    this.searchText = text;
    this.offset = 0;
    this.adminService.searchTextChanged.next(true);
    this.getSuspendedList();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
