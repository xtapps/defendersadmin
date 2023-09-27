import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IApiRes } from 'src/app/models/model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-military',
  templateUrl: './military.component.html',
  styleUrls: ['./military.component.scss']
})
export class MilitaryComponent implements OnInit, OnDestroy {

  militaryList: IApiRes['properties'] = [];
  isLoading = true;
  subscription: Subscription[] = [];
  limit = 13;
  offset = 1;
  totalRecords = 0;

  constructor(
    private adminService: AdminService,
    private router: Router) { }

  ngOnInit(): void {
    this.getMilitaryList();
  }

  getMilitaryList(): void {
    const properties = {
      appSection: 'military',
      propertyType: 'charity'
    }

    this.adminService.getProperties(properties, this.limit, this.offset).subscribe(res => {
      this.isLoading = false;
      this.militaryList = res[0].properties;
      this.totalRecords = res[0].totalRecords;
    });
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.militaryList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'job-boards' } });
  }

  previousClickEvent(event: boolean): void {
    if (this.offset > 0 && event) {
      this.offset -= 1;
      this.getMilitaryList();
    }
  }

  nextClickEvent(event: boolean): void {
    if (event) {
      this.offset += 1;
      this.getMilitaryList();
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => el.unsubscribe());
  }

}
