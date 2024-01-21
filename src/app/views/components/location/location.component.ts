import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { PAGINATION } from 'src/assets/app-constant';
import { PropertiesModel } from '../model/properties.model';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent extends PropertiesModel implements OnInit, OnDestroy {

  locationList: any[] = [];
  subscription: Subscription[] = [];
  isLoading = true;
  public offset: number = PAGINATION.offset;
  limit = PAGINATION.limit;
  totalRecords = 0;
  searchText: any = '';

  constructor(
    private adminService: AdminService,
    public override router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.getAllLocation();
  }

  applyFilter(text: any) {
    this.searchText = text;
    this.offset = 0;
    this.adminService.searchTextChanged.next(true);
    this.getAllLocation();
  }

  getAllLocation(): void {
    this.isLoading = true;
    this.searchText = `searchFromADMIN:${this.searchText}`;
    this.subscription.push(
      this.adminService.getLocations(this.limit, this.offset, this.searchText).subscribe((res: any) => {
        this.isLoading = false;
        this.locationList = res[0]?.properties || res.properties;
        this.totalRecords = res[0]?.totalRecords || res.count;
      })
    );
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { type: 'location' } });
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.locationList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'location' } });
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getAllLocation();
  }

  deleteItem(id: string): void {
    var userResponse = confirm("Do you want to proceed?");
    if (userResponse) {
      this.deleteAppsItem(id);
    }
  }

  deleteAppsItem(id: string): void {
    this.subscription.push(
      this.adminService.deleteProperty(id).subscribe({
        next: (res => {
          this.getAllLocation();
        }),
        error: (err => {
          if (err.status === 201) {
            alert('Location deleted Successfully!');
            this.getAllLocation();
          }
        })
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => el.unsubscribe());
  }

}
