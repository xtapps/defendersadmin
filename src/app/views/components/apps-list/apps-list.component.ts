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
  isLoading= true;
  public pageSize: number = 13;
  public offset: number = 0;

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
    });
  }

  goToViewPage(index:number): void {
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
    if(event){
      this.offset += 1;
      this.getAppslIst();
    }
   }

}
