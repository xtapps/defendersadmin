import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { IApiRes } from 'src/app/models/model';
import { AdminService } from 'src/app/services/admin.service';
import { PAGINATION } from 'src/assets/app-constant';
import { PropertiesModel } from '../../components/model/properties.model';

@Component({
  selector: 'app-mobileapps',
  templateUrl: './mobileapps.component.html',
  styleUrls: ['./mobileapps.component.scss']
})
export class MobileAppsComponent extends PropertiesModel implements OnInit, OnDestroy {

  militaryList: IApiRes['properties'] = [];
  isLoading = true;
  subscription: Subscription[] = [];
  limit = PAGINATION.limit;
  offset = PAGINATION.offset;
  totalRecords = 0;
  searchText: any = '';

  constructor(
    private adminService: AdminService,
    public override router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.getMilitaryList();
  }

  getMilitaryList(): void {
    const properties = {
      appSection: 'support',
      propertyType: 'app'
    }

    this.adminService.getProperties(properties, this.limit, this.offset, this.searchText).subscribe(res => {
      this.isLoading = false;
      this.militaryList = res[0]?.properties;
      this.totalRecords = res[0]?.totalRecords;
    });
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.militaryList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'military' } });
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getMilitaryList();
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
      this.adminService.deleteProperties(id).pipe(
        finalize(() => {this.isLoading = false;})
      ).subscribe(res => {
        this.getMilitaryList();
      }, err => {
        if (err.status === 201) {
          alert('Item deleted Successfully!');
          this.getMilitaryList();
        }
      })
    )
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new-mobile-app'], { queryParams: { propertyType: 'app', orgType: 'commercial', appSection: 'support', type: 'mobileApps' } });
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => el.unsubscribe());
  }

  editItem(ev: any): void {
    this.router.navigate(['/admin/add-new-mobile-app'], {state: ev, queryParams: { propertyType: 'app', orgType: 'commercial', appSection: 'support', type: 'mobileApps', editMode: 'true' } });
  }

  applyFilter(text: any) {
    this.searchText = text;
    this.offset = 0;
    this.adminService.searchTextChanged.next(true);
    this.getMilitaryList();
  }

}
