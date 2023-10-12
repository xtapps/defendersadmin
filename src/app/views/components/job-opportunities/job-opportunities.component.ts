import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-job-opportunities',
  templateUrl: './job-opportunities.component.html',
  styleUrls: ['./job-opportunities.component.scss']
})
export class JobOpportunitiesComponent implements OnInit, OnDestroy {

  jobOpportunities: any[]= [];
  subscription: Subscription[] = [];
  isLoading = true;

  constructor(
    private adminService: AdminService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getJobOpportunities();
  }

  getJobOpportunities(): void {
    this.adminService.getJobOpportunities(13, 0).subscribe((res: any) => {
      this.isLoading = false;
      this.jobOpportunities = res.jobs;
    });
  }

  goToViewPage(index:number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.jobOpportunities[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData } });
  }

  deleteItem(id: string): void {
    var userResponse = confirm("Do you want to proceed?");
    if (userResponse) {
      alert("You chose to proceed!");
      return;
      this.onDelete(id);
    }
  }

  onDelete(id: string): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.deleteJob(id).pipe(
        finalize(() => {this.isLoading = false;})
      ).subscribe(res => {
        if(res.success){
          this.getJobOpportunities();
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
