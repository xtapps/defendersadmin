import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-job-opportunities',
  templateUrl: './job-opportunities.component.html',
  styleUrls: ['./job-opportunities.component.scss']
})
export class JobOpportunitiesComponent {

  jobOpportunities: any[]= [];
  isLoading = true;

  constructor(
    private adminService: AdminService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getJobOpportunities();
  }

  getJobOpportunities(): void {
    this.adminService.getJobOpportunities(13, 1).subscribe((res: any) => {
      this.isLoading = false;
      this.jobOpportunities = res.jobs;
    });
  }

  goToViewPage(index:number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.jobOpportunities[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData } });
  }

}
