import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { PropertiesModel } from '../model/properties.model';
import { PAGINATION } from 'src/assets/app-constant';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent extends PropertiesModel implements OnInit, OnDestroy {

  displayedColumns: string[] = [
    'corpName',
    'locationName',
    'address1',
    'city',
    'state',
    'zip',
    'phone',
  ];
  isLoading = true;
  partnersList: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  @ViewChild(MatSort) sort: MatSort = {} as MatSort;

  public totalRecords: number = 0;
  public offset: number = PAGINATION.offset;
  limit = PAGINATION.limit;

  private searchText: string = '';

  private subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    public override router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.getAllProperties();
  }

  getAllProperties() {
    this.isLoading = true;
    const propSub = this.adminService.getAllProperties(this.limit, this.offset, this.searchText).subscribe((res: any) => {
      this.isLoading = false;
      this.partnersList = res.properties;
      this.totalRecords = res.totalRecords;
    });

    this.subscriptions.push(propSub);
  }

  applyFilter(event: any) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
    if (event.keyCode === 13) {
      this.searchText = (event.target as HTMLInputElement).value;
      this.getAllProperties();
    }
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], {queryParams:{type: 'partner'}});
  }

  editItem(ev: any): void {
    this.router.navigate(['/admin/add-new'], {state: ev, queryParams: { propertyType: 'partner', orgType: 'commercial', appSection: 'partner', type: 'properties', editMode: 'true' } });
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getAllProperties();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
