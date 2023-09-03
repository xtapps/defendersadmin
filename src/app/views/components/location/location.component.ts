import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {

  locationList: any[]= [];
  isLoading = true;
  constructor(
    private adminService: AdminService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getAllLocation();
  }

  getAllLocation(): void {
    this.adminService.getLocations(13, 1).subscribe((res: any) => {
      this.isLoading = false;
      this.locationList = res[0].properties;
    });
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], {queryParams:{type: 'location'}});
  }

  goToViewPage(index: number): void {
   // Encode the JSON data and navigate to ViewComponent with it as a query parameter
   const encodedData = encodeURIComponent(JSON.stringify(this.locationList[index]));
   this.router.navigate(['admin/view'], { queryParams: { data: encodedData } });
  }

}
