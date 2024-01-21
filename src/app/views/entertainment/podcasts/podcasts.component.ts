import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { PAGINATION } from 'src/assets/app-constant';
import { PropertiesModel } from '../../components/model/properties.model';

@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
  styleUrls: ['./podcasts.component.scss']
})
export class PodcastsComponent extends PropertiesModel implements OnInit, OnDestroy {

  bookPlusLists: any[] = [];
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
    this.getBooksPlusLists();
  }

  getBooksPlusLists(): void {
    const properties = {
      appSection: 'entertainment',
      propertyType: 'podcast'
    }

    this.adminService.getProperties(properties, this.limit, this.offset, this.searchText).subscribe(res => {
      this.isLoading = false;
      this.bookPlusLists = res[0]?.properties;
      this.totalRecords = res[0]?.totalRecords;
    });
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { propertyType: 'podcast', orgType: 'commercial', appSection: 'entertainment', type: 'properties' } });
  }

  editItem(ev: any): void {
    this.router.navigate(['/admin/add-new'], {state: ev, queryParams: { propertyType: 'podcast', orgType: 'commercial', appSection: 'entertainment', type: 'properties', editMode: 'true' } });
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.bookPlusLists[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'books plus' } });
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getBooksPlusLists();
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
        this.getBooksPlusLists();
      }, err => {
        if (err.status === 201) {
          alert('Deleted Successfully!');
          this.getBooksPlusLists();
        }
      })
    )
  }

  applyFilter(text: any) {
    this.searchText = text;
    this.offset = 0;
    this.adminService.searchTextChanged.next(true);
    this.getBooksPlusLists();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => el.unsubscribe());
  }
}
