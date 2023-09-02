import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-apps-list',
  templateUrl: './apps-list.component.html',
  styleUrls: ['./apps-list.component.scss']
})
export class AppsListComponent implements OnInit {

  appsList: any[]= [];

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
    this.adminService.getApps(10, 0).subscribe((res: any) => {
      this.appsList = res[0].properties;
    });
  }

  goToViewPage(index:number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.appsList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData } });
  }

}
