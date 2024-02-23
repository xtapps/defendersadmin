import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { PAGINATION } from 'src/assets/app-constant';
import { partnerPropertiesModel } from '../model/partnerProperties.model';

@Component({
  selector: 'app-partner-table-list',
  templateUrl: './partner-table-list.component.html',
  styleUrls: ['./partner-table-list.component.scss']
})
export class PartnerTableListComponent extends partnerPropertiesModel implements OnInit, OnDestroy {

  isLoading = true;
  partnersList: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  @ViewChild(MatSort) sort: MatSort = {} as MatSort;

  public totalRecords: number = 0;
  public offset: number = PAGINATION.offset;
  limit = PAGINATION.limit;

  searchText: any = '';

  private subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    public override router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.getPartners();
  }

  getPartners() {
    this.isLoading = true;
    this.subscriptions.push(
      this.adminService.getPropertiesListByPartnerId(this.limit, this.offset, this.searchText).subscribe((res: any) => {
        this.isLoading = false;
        this.partnersList = res?.properties;
        this.totalRecords = res?.count;
      })
    );
  }

  applyFilter(text: any) {
    this.searchText = text;
    this.offset = 0;
    this.adminService.searchTextChanged.next(true);
    this.getPartners();
  }

  addNew(): void {
    this.router.navigate(['/partnerDashboard/property'], {queryParams:{type: 'partner'}});
  }

  editItem(property: any): void {
    this.router.navigate(['/partnerDashboard/property'], { queryParams: { propertyId: property._id } });
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getPartners();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
