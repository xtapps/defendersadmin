import { Component,  OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-rejected-list',
  templateUrl: './rejected-list.component.html',
  styleUrls: ['./rejected-list.component.scss']
})
export class RejectedListComponent implements OnInit, OnDestroy{

  subscription: Subscription[] = [];
  rejectedList: any[] = [];
  limit = 13;
  offset = 1;
  totalRecords = 0;
  isLoading = false

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRejectedList();
  }

  getRejectedList(): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.getUserStatus(3, this.limit, this.offset).pipe(
        finalize(() => { this.isLoading = false })
      ).subscribe(res => {
        this.rejectedList = res;
      })
    );
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.rejectedList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'rejected' } });
  }

  previousClickEvent(event: boolean): void {
    if (this.offset > 0 && event) {
      this.offset -= 1;
      this.getRejectedList();
    }
  }

  nextClickEvent(event: boolean): void {
    if (event) {
      this.offset += 1;
      this.getRejectedList();
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
