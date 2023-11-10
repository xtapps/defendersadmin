import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Subscription, finalize } from 'rxjs';
import { PAGINATION } from 'src/assets/app-constant';
import { PropertiesModel } from '../model/properties.model';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.scss']
})
export class WebsitesComponent extends PropertiesModel implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  websitesList: any[] = [];
  subscription: Subscription[] = [];
  isLoading = true;
  public offset: number = PAGINATION.offset;
  totalRecords = 0;
  limit = PAGINATION.limit;

  constructor(
    private adminService: AdminService,
    public override router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.getWebsites();
  }

  getWebsites(): void {
    this.isLoading = true;
    this.adminService.getWebsites(this.limit, this.offset).subscribe((res: any) => {
      this.isLoading = false;
      this.websitesList = res[0]?.properties;
      this.totalRecords = res[0]?.totalRecords;
    });
  }


  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { propertyType: 'website', type: 'website' } });
  }

  editItem(ev: any): void {
    this.router.navigate(['/admin/add-new'], {state: ev, queryParams: { propertyType: 'website', orgType: 'commercial', appSection: 'partner', type: 'website', editMode: 'true' } });
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.websitesList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'website' } });
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getWebsites();
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
        this.getWebsites();
      }, err => {
        if (err.status === 201) {
          alert('Website deleted Successfully!');
          this.getWebsites();
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => el.unsubscribe());
  }
}
