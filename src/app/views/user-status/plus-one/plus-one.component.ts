import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { DefenderModel } from '../model/defender.model';

@Component({
  selector: 'app-plus-one',
  templateUrl: './plus-one.component.html',
  styleUrls: ['./plus-one.component.scss']
})
export class PlusOneComponent extends DefenderModel implements OnInit, OnDestroy{

  subscription: Subscription[] = [];
  plusOneList: any[] = [];
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
    this.getPlusOneList();
  }

  getPlusOneList(): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.getUserStatus(5, this.limit, this.offset, undefined, this.searchText).pipe(
        finalize(() => { this.isLoading = false })
      ).subscribe(res => {
        this.plusOneList = res.defendersList;
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
        this.getPlusOneList();
      }, err => {
        if (err.status === 201) {
          this.getPlusOneList();
        }
      })
    )
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getPlusOneList();
  }

  applyFilter(text: any) {
    this.searchText = text
    this.getPlusOneList();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }



}
