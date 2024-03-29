import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { PAGINATION } from 'src/assets/app-constant';
import { BusinessModel } from '../model/business.model';

@Component({
  selector: 'app-business-opportunities',
  templateUrl: './business-opportunities.component.html',
  styleUrls: ['./business-opportunities.component.scss']
})
export class BusinessOpportunitiesComponent extends BusinessModel implements OnInit, OnDestroy {
  
  businessList: any[]= [];
  isLoading = true;
  limit = PAGINATION.limit;
  offset = PAGINATION.offset;
  totalRecords = 0;
  searchText: any = '';
  subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    public override router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.getBusinessOpportunities();
  }

  getBusinessOpportunities(): void {
    this.subscriptions.push(
      this.adminService.getFranchises(this.limit, this.offset, this.searchText).subscribe((res: any) => {
        this.isLoading = false;
        this.businessList = res.franchises;
        this.totalRecords = res.totalCount;
      })
    );
  }

  goToViewPage(index:number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.businessList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData } });
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getBusinessOpportunities();
  }

  applyFilter(text: any) {
    this.searchText = text;
    this.offset = 0;
    this.adminService.searchTextChanged.next(true);
    this.getBusinessOpportunities();
  }

  deleteItem(id: string): void {
    var userResponse = confirm("Do you want to proceed?");
    if (userResponse) {
      this.deleteFranchises(id);
    }
  }

  deleteFranchises(id: string): void {
    this.subscriptions.push(
      this.adminService.deleteFranchises(id).subscribe({
        next: (res => {
          alert('Business opportunity deleted Successfully!');
          this.getBusinessOpportunities();
        }),
        error: (err => {
          if (err.status === 201) {
            alert('Business opportunity deleted Successfully!');
            this.getBusinessOpportunities();
          }
        })
      })
    )
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { type: 'franchises' } });
  }

  editItem(ev: any): void {
    this.router.navigate(['/admin/add-new'], {state: ev, queryParams: { propertyType: 'franchises', orgType: 'commercial', appSection: 'partner', type: 'franchises', editMode: 'true' } });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
