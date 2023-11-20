import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { PAGINATION } from 'src/assets/app-constant';
import { PropertiesModel } from '../model/properties.model';

@Component({
  selector: 'app-apps-list',
  templateUrl: './apps-list.component.html',
  styleUrls: ['./apps-list.component.scss']
})
export class AppsListComponent extends PropertiesModel implements OnInit, OnDestroy {

  appsList: any[] = [];
  subscription: Subscription[] = [];
  isLoading = true;
  public offset: number = PAGINATION.offset;
  totalRecords = 0;
  limit = PAGINATION.limit;
  searchText: any = '';

  constructor(
    private adminService: AdminService,
    public override router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.getAppslIst();
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { type: 'app' } });
  }

  getAppslIst(): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.getApps(this.limit, this.offset, this.searchText).subscribe((res: any) => {
        this.isLoading = false;
        this.appsList = res[0]?.properties;
        this.totalRecords = res[0]?.totalRecords;
      })
    );
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.appsList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'apps' } });
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getAppslIst();
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
          this.getAppslIst();
        }),
        error: (err => {
          if (err.status === 201) {
            alert('App deleted Successfully!');
            this.getAppslIst();
          }
        })
      })
    )
  }

  applyFilter(text: any) {
    this.searchText = text
    this.getAppslIst();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
