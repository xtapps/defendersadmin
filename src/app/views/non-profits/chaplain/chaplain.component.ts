import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-chaplain',
  templateUrl: './chaplain.component.html',
  styleUrls: ['./chaplain.component.scss']
})
export class ChaplainComponent {

  chaplainList: any[] = [];
  isLoading = true;
  subscription: Subscription[] = [];
  limit = 13;
  offset = 1;
  totalRecords = 0;

  constructor(
    private adminService: AdminService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getChaplainList();
  }

  getChaplainList(): void {
    const properties = {
      appSection: 'chaplain ',
      propertyType: 'charity'
    }

    this.adminService.getProperties(properties, this.limit, this.offset).subscribe(res => {
      this.isLoading = false;
      this.chaplainList = res[0]?.properties;
      this.totalRecords = res[0]?.totalRecords;
    });
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.chaplainList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'job-boards' } });
  }

  previousClickEvent(event: boolean): void {
    if (this.offset > 0 && event) {
      this.offset -= 1;
      this.getChaplainList();
    }
  }

  nextClickEvent(event: boolean): void {
    if (event) {
      this.offset += 1;
      this.getChaplainList();
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => el.unsubscribe());
  }
}
