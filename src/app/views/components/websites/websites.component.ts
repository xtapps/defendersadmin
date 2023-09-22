import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.scss']
})
export class WebsitesComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  websitesList: any[] = [];
  isLoading = true;
  public pageSize: number = 13;
  public offset: number = 0;
  totalCount = 0;

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
      this.websitesList = res[0].properties;
      this.totalCount = res[0].totalRecords;
    });
  }


  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { type: 'website' } });
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.websitesList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData } });
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
      const lastPage = Math.ceil(this.totalCount / this.pageSize);
      if (lastPage <= this.offset) {
        return;
      }
      this.offset += 1;
      console.log(lastPage);
      this.getWebsites();
    }
  }

}
