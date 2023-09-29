import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-submited-list',
  templateUrl: './submited-list.component.html',
  styleUrls: ['./submited-list.component.scss']
})
export class SubmitedListComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  submitedList: any[] = [];
  limit = 13;
  offset = 1;
  totalRecords = 0;
  isLoading = false

  
  constructor(
    private adminService: AdminService,
    private router: Router
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
        this.submitedList = res;
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

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
