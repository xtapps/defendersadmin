import { Component,  OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { DefenderModel } from '../model/defender.model';

@Component({
  selector: 'app-rejected-list',
  templateUrl: './rejected-list.component.html',
  styleUrls: ['./rejected-list.component.scss']
})
export class RejectedListComponent extends DefenderModel implements OnInit, OnDestroy{

  subscription: Subscription[] = [];
  rejectedList: any[] = [];
  limit = 13;
  offset = 0;
  totalRecords = 0;
  isLoading = false

  constructor(
    private adminService: AdminService,
    public override router: Router
  ) {
    super(router)
  }

  ngOnInit(): void {
    this.getRejectedList();
  }

  getRejectedList(): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.getUserStatus(3, this.limit, this.offset).pipe(
        finalize(() => { this.isLoading = false })
      ).subscribe(res => {
        this.rejectedList = res.defendersList;
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
        this.getRejectedList();
      }, err => {
        if (err.status === 201) {
          this.getRejectedList();
        }
      })
    )
  }

  getChange(event: Event, item: any): void {
    const selectedValue = event.target as HTMLInputElement;
    console.log(selectedValue.value);

    const userResponse = confirm(`Are you sure to proceed ${selectedValue.value}`);
    if (userResponse) {
      if (selectedValue.value === 'accept') {
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
        this.getRejectedList();
      })
    );
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getRejectedList();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
