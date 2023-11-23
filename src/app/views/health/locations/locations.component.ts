import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { PAGINATION } from 'src/assets/app-constant';
import { PropertiesModel } from '../../components/model/properties.model';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent extends PropertiesModel implements OnInit, OnDestroy {

  chaplainList: any[] = [];
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
    this.getChaplainList();
  }

  getChaplainList(): void {
    const properties = {
      appSection: 'support',
      propertyType: 'partner'
    }

    this.adminService.getProperties(properties, this.limit, this.offset, this.searchText).subscribe(res => {
      this.isLoading = false;
      this.chaplainList = res[0]?.properties;
      this.totalRecords = res[0]?.totalRecords;
    });
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { propertyType: 'partner', orgType: 'commercial', appSection: 'support', type: 'properties' } });
  }

  editItem(ev: any): void {
    this.router.navigate(['/admin/add-new'], {state: ev, queryParams: { propertyType: 'partner', orgType: 'commercial', appSection: 'support', type: 'properties', editMode: 'true' } });
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.chaplainList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'chaplain' } });
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getChaplainList();
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
        this.getChaplainList();
      }, err => {
        if (err.status === 201) {
          alert('Item deleted Successfully!');
          this.getChaplainList();
        }
      })
    )
  }

  applyFilter(text: any) {
    this.searchText = text
    this.getChaplainList();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => el.unsubscribe());
  }
}
