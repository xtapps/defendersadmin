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

  locationList: any[] = [];
  isLoading = true;
  public pageSize: number = 13;
  public offset: number = 0;
  totalCount = 0;
  constructor(
    private adminService: AdminService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getAllLocation();
  }

  getAllLocation(): void {
    this.isLoading = true;
    this.adminService.getLocations(this.pageSize, this.offset).subscribe((res: any) => {
      this.isLoading = false;
      this.locationList = res[0].properties;
      this.totalCount = res[0].totalRecords;
    });
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { type: 'location' } });
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.locationList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData } });
  }

  previousClickEvent(event: boolean): void {
    if (this.offset > 0 && event) {
      this.offset -= 1;
      // You can add any additional logic here when the "previous" button is clicked.
      this.getAllLocation();
    }
  }

  nextClickEvent(event: boolean): void {
    if (event) {
      const lastPage = Math.ceil(this.totalCount / this.pageSize);
      if (lastPage <= this.offset) {
        return;
      }
      this.offset += 1;
      this.getAllLocation();
    }
  }

}
