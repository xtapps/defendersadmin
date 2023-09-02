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
  displayedColumns: string[] = this.adminService.tempColumns;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  websitesList: any[] = [];

  constructor(private adminService: AdminService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getWebsites();
  }

  getWebsites(): void {
    this.adminService.getWebsites(10, 0).subscribe((res: any) => {
      this.websitesList = res[0].properties;
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

}
