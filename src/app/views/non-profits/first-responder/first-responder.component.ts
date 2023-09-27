import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IApiRes } from 'src/app/models/model';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-first-responder',
  templateUrl: './first-responder.component.html',
  styleUrls: ['./first-responder.component.scss']
})
export class FirstResponderComponent implements OnInit, OnDestroy {

  firstResponderList: IApiRes['properties'] | any = [];
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
    this.getFirstResponderList();
  }

  getFirstResponderList(): void {
    const properties = {
      appSection: 'firstResponder',
      propertyType: 'charity'
    }

    this.adminService.getProperties(properties, this.limit, this.offset).subscribe(res => {
      this.isLoading = false;
      this.firstResponderList = res[0]?.properties;
      this.totalRecords = res[0]?.totalRecords;
    });
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.firstResponderList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'job-boards' } });
  }

  previousClickEvent(event: boolean): void {
    if (this.offset > 0 && event) {
      this.offset -= 1;
      this.getFirstResponderList();
    }
  }

  nextClickEvent(event: boolean): void {
    if (event) {
      this.offset += 1;
      this.getFirstResponderList();
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => el.unsubscribe());
  }
}
