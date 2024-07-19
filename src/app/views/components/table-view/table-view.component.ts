import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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

  searchText: any = '';

  isCategory: boolean = false;
  categoryId: any = '';
  category: any;

  private subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    public override router: Router,
    private route: ActivatedRoute
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.initFunc();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(event)
        this.initFunc();
      }
    });
  }

  initFunc() {
    this.isCategory = (this.route.snapshot.queryParamMap.get('isCategory') === 'true');
    this.categoryId = this.route.snapshot.queryParamMap.get('categoryId');
    this.selectProperFunctionToFetchData();
  }

  selectProperFunctionToFetchData() {
    if (this.isCategory) {
      this.getPartnersByCategories();      
    } else {
      this.getPartners();
    }
  }

  getPartners() {
    this.isLoading = true;
    const propSub = this.adminService.getPartners(this.limit, this.offset, this.searchText, 'desc').subscribe((res: any) => {
      this.isLoading = false;
      this.partnersList = res[0]?.properties;
      this.totalRecords = res[0]?.totalRecords;
      this.category = null;
    });

    this.subscriptions.push(propSub);
  }

  getPartnersByCategories() {
    this.isLoading = true;
    const propSub = this.adminService.getPartnersByCategories(this.limit, this.offset, this.searchText, this.categoryId).subscribe((res: any) => {
      this.isLoading = false;
      this.partnersList = res?.properties;
      this.totalRecords = res?.totalRecords;
      this.category = res?.category;
    });

    this.subscriptions.push(propSub);
  }

  applyFilter(text: any) {
    this.searchText = text;
    this.offset = 0;
    this.adminService.searchTextChanged.next(true);
    this.selectProperFunctionToFetchData();
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], {queryParams:{type: 'partner', from: '/admin/home'}});
  }

  editItem(ev: any): void {
    this.router.navigate(['/admin/add-new'], {state: ev, queryParams: { propertyType: 'partner', orgType: 'commercial', appSection: 'partner', type: 'properties', editMode: 'true', from: '/admin/home' } });
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.selectProperFunctionToFetchData();
  }

  deleteItem(id: any) {
    const userResponse = confirm("Do you want to proceed?");
    if (userResponse) {
      this.onDelete(id);
    }
  }

  onDelete(id: any) {
    this.subscriptions.push(
      this.adminService.deleteProperty(id).subscribe(res => {
        this.offset = 0;
        this.selectProperFunctionToFetchData();
      }, err => {
        console.log(err)
        if (err.status === 201) {
          alert('Partner deleted successfully.');
          this.offset = 0;
          this.selectProperFunctionToFetchData();
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
