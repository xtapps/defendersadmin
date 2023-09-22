import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-apps-list',
  templateUrl: './apps-list.component.html',
  styleUrls: ['./apps-list.component.scss']
})
export class AppsListComponent implements OnInit, OnDestroy {

  appsList: any[] = [];
  subscription: Subscription[] = [];
  isLoading = true;
  public pageSize: number = 13;
  public offset: number = 0;
  totalCount = 0;


  constructor(
    private adminService: AdminService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getAppslIst();
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { type: 'app' } });
  }

  getAppslIst(): void {
    this.isLoading = true;
    this.adminService.getApps(this.pageSize, this.offset).subscribe((res: any) => {
      this.isLoading = false;
      this.appsList = res[0].properties;
      this.totalCount = res[0].totalRecords;
    });
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.appsList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData } });
  }

  previousClickEvent(event: boolean): void {
    if (this.offset > 0 && event) {
      this.offset -= 1;
      // You can add any additional logic here when the "previous" button is clicked.
      this.getAppslIst();
    }
  }

  nextClickEvent(event: boolean): void {
    if (event) {
      const lastPage = Math.ceil(this.totalCount / this.pageSize);
      if (lastPage <= this.offset) {
        return;
      }
      this.offset += 1;
      this.getAppslIst();
    }
  }

  deleteItem(id: string): void {
    var userResponse = confirm("Do you want to proceed?");
    if (userResponse) {
      this.deleteAppsItem(id);
    }
  }

  
  deleteAppsItem(id: string): void {
    this.subscription.push(
      this.adminService.deleteApps(id).subscribe({
        next: (res => {
          if (res) {
            this.offset = 0;
            this.getAppslIst();
            alert('Group Code item deleted Successfully!');
          }
        })
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
