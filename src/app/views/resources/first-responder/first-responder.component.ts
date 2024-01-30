import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { IApiRes } from 'src/app/models/model';
import { AdminService } from 'src/app/services/admin.service';
import { PAGINATION } from 'src/assets/app-constant';
import { PropertiesModel } from '../../components/model/properties.model';


@Component({
  selector: 'app-first-responder',
  templateUrl: './first-responder.component.html',
  styleUrls: ['./first-responder.component.scss']
})
export class FirstResponderComponent extends PropertiesModel implements OnInit, OnDestroy {

  firstResponderList: IApiRes['properties'] | any = [];
  isLoading = true;
  subscription: Subscription[] = [];
  limit = PAGINATION.limit;
  offset = PAGINATION.offset;
  totalRecords = 0;
  searchText: any = '';

  constructor(
    private adminService: AdminService,
    public override router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.getFirstResponderList();
  }

  getFirstResponderList(): void {
    this.subscription.push(
      this.adminService.getResourcesForAdmin(this.limit, this.offset, this.searchText, 'firstResponder').subscribe(res => {
        this.isLoading = false;
        this.firstResponderList = res?.properties;
        this.totalRecords = res?.totalRecords;
      })
    );
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { propertyType: 'charity', orgType: 'commercial', appSection: 'firstResponder', type: 'properties' } });
  }

  editItem(ev: any): void {
    this.router.navigate(['/admin/add-new'], {state: ev, queryParams: { propertyType: 'charity', orgType: 'commercial', appSection: 'firstResponder', type: 'properties', editMode: 'true' } });
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getFirstResponderList();
  }

  deleteItem(id: string): void {
    var userResponse = confirm("Do you want to proceed?");
    if (userResponse) {
      this.onDelete(id);
    }
  }

  onDelete(id: string): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.deleteProperties(id).pipe(
        finalize(() => {this.isLoading = false;})
      ).subscribe(res => {
        this.getFirstResponderList();
      }, err => {
        if (err.status === 201) {
          alert('First responder deleted Successfully!');
          this.getFirstResponderList();
        }
      })
    )
  }

  applyFilter(text: any) {
    this.searchText = text;
    this.offset = 0;
    this.adminService.searchTextChanged.next(true);
    this.getFirstResponderList();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => el.unsubscribe());
  }
}
