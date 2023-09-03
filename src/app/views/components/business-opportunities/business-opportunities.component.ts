import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-business-opportunities',
  templateUrl: './business-opportunities.component.html',
  styleUrls: ['./business-opportunities.component.scss']
})
export class BusinessOpportunitiesComponent implements OnInit {
  
  businessList: any[]= [];
  isLoading = true;

  constructor(
    private adminService: AdminService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getBusinessOpportunities();
  }

  getBusinessOpportunities(): void {
    this.adminService.getFranchises(12, 1).subscribe((res: any) => {
      this.isLoading = false;
      this.businessList = res.franchises;
    });
  }

  goToViewPage(index:number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.businessList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData } });
  }

}
