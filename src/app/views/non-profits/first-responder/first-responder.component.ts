import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
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
  offset = 0;
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

  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { propertyType: 'charity', orgType: 'commercial', appSection: 'firstResponder', type: 'properties' } });
  }

  editItem(ev: any): void {
    this.router.navigate(['/admin/add-new'], {state: ev, queryParams: { propertyType: 'charity', orgType: 'commercial', appSection: 'firstResponder', type: 'properties', editMode: 'true' } });
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
          this.getFirstResponderList();
        }
      })
    )
  }
  

  ngOnDestroy(): void {
    this.subscription.forEach(el => el.unsubscribe());
  }
}
