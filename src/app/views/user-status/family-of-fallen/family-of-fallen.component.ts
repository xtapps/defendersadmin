import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { DefenderModel } from '../model/defender.model';

@Component({
  selector: 'app-family-of-fallen',
  templateUrl: './family-of-fallen.component.html',
  styleUrls: ['./family-of-fallen.component.scss']
})
export class FamilyOfFallenComponent extends DefenderModel implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  familyFallenList: any[] = [];
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
    this.familyOfFallenList();
  }

  familyOfFallenList(): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.getUserStatus(6 , this.limit, this.offset, undefined, this.searchText).pipe(
        finalize(() => { this.isLoading = false })
      ).subscribe(res => {
        this.familyFallenList = res.defendersList;
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
        this.familyOfFallenList();
      }, err => {
        if (err.status === 201) {
          this.familyOfFallenList();
        }
      })
    )
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.familyOfFallenList();
  }

  applyFilter(text: any) {
    this.searchText = text
    this.familyOfFallenList();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }
}
