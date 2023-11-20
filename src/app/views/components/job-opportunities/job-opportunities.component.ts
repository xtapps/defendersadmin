import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { PAGINATION } from 'src/assets/app-constant';
import { JobModel } from '../model/job.model';

@Component({
  selector: 'app-job-opportunities',
  templateUrl: './job-opportunities.component.html',
  styleUrls: ['./job-opportunities.component.scss']
})
export class JobOpportunitiesComponent extends JobModel implements OnInit, OnDestroy {

  jobOpportunities: any[]= [];
  subscription: Subscription[] = [];
  isLoading = true;
  limit: number = PAGINATION.limit;
  offset: number = PAGINATION.offset;
  totalRecords: number = 0;
  searchText: any = '';

  constructor(
    private adminService: AdminService,
    public override router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.getJobOpportunities();
  }

  getJobOpportunities(): void {
    this.subscription.push(
      this.adminService.getJobOpportunities(this.limit, this.offset, this.searchText).subscribe((res: any) => {
        this.isLoading = false;
        this.jobOpportunities = res.jobs;
        this.totalRecords = res.totalRecords;
      }));
  }

  goToViewPage(index:number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.jobOpportunities[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData } });
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getJobOpportunities();
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
      this.adminService.deleteJob(id).pipe(
        finalize(() => {this.isLoading = false;})
      ).subscribe(res => {
        this.getJobOpportunities();
      }, err => {
        if (err.status === 201) {
          this.getJobOpportunities();
        }
      })
    )
  }

  applyFilter(text: any) {
    this.searchText = text
    this.getJobOpportunities();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
