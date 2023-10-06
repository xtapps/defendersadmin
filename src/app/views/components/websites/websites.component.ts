import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Subscription, finalize } from 'rxjs';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.scss']
})
export class WebsitesComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  websitesList: any[] = [];
  subscription: Subscription[] = [];
  isLoading = true;
  public pageSize: number = 13;
  public offset: number = 0;
  totalRecords = 0;
  limit = 13;

  constructor(private adminService: AdminService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getWebsites();
  }

  getWebsites(): void {
    this.isLoading = true;
    this.adminService.getWebsites(this.pageSize, this.offset).subscribe((res: any) => {
      this.isLoading = false;
      this.websitesList = res[0]?.properties;
      this.totalRecords = res[0]?.totalRecords;
    });
  }


  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { type: 'website' } });
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.websitesList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'website' } });
  }

  previousClickEvent(event: boolean): void {
    if (this.offset > 0 && event) {
      this.offset -= 1;
      // You can add any additional logic here when the "previous" button is clicked.
      this.getWebsites();
    }
  }

  nextClickEvent(event: boolean): void {
    if (event) {
      this.offset += 1;
      this.getWebsites();
    }
  }

  deleteItem(id: string): void {
    var userResponse = confirm("Do you want to proceed?");
    if (userResponse) {
      alert("You chose to proceed!");
      return;
      this.onDelete(id);
    }
  }

  onDelete(id: string): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.deleteProperties(id).pipe(
        finalize(() => {this.isLoading = false;})
      ).subscribe(res => {
        if(res.success){
          this.getWebsites();
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => el.unsubscribe());
  }
}
