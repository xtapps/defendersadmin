import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { PAGINATION } from 'src/assets/app-constant';
import { PropertiesModel } from '../../components/model/properties.model';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent extends PropertiesModel implements OnInit, OnDestroy {

  othersList: any[] = [];
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
    this.getOthersList();
  }

  getOthersList(): void {
    const properties = {
      appSection: 'other',
      propertyType: 'charity'
    }

    this.adminService.getProperties(properties, this.limit, this.offset, this.searchText).subscribe(res => {
      this.isLoading = false;
      this.othersList = res[0]?.properties;
      this.totalRecords = res[0]?.totalRecords;
    });
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { propertyType: 'charity', orgType: 'commercial', appSection: 'other', type: 'properties' } });
  }

  editItem(ev: any): void {
    this.router.navigate(['/admin/add-new'], {state: ev, queryParams: { propertyType: 'charity', orgType: 'commercial', appSection: 'other', type: 'properties', editMode: 'true' } });
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.othersList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'others' } });
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getOthersList();
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
        this.getOthersList();
      }, err => {
        if (err.status === 201) {
          alert('Other category deleted Successfully!');
          this.getOthersList();
        }
      })
    )
  }

  applyFilter(text: any) {
    this.searchText = text;
    this.offset = 0;
    this.adminService.searchTextChanged.next(true);
    this.getOthersList();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => el.unsubscribe());
  }
}
