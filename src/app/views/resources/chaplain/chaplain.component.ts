import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { PAGINATION } from 'src/assets/app-constant';
import { PropertiesModel } from '../../components/model/properties.model';

@Component({
  selector: 'app-chaplain',
  templateUrl: './chaplain.component.html',
  styleUrls: ['./chaplain.component.scss']
})
export class ChaplainComponent extends PropertiesModel implements OnInit, OnDestroy {

  chaplainList: any[] = [];
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
    this.getChaplainList();
  }

  getChaplainList(): void {
    this.subscription.push(
      this.adminService.getResourcesForAdmin(this.limit, this.offset, this.searchText, 'chaplain').subscribe(res => {
        this.isLoading = false;
        this.chaplainList = res?.properties;
        this.totalRecords = res?.totalRecords;
      })
    );
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { propertyType: 'charity', orgType: 'commercial', appSection: 'chaplain', type: 'properties' } });
  }

  editItem(ev: any): void {
    this.router.navigate(['/admin/add-new'], {state: ev, queryParams: { propertyType: 'charity', orgType: 'commercial', appSection: 'chaplain', type: 'properties', editMode: 'true' } });
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getChaplainList();
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
        this.getChaplainList();
      }, err => {
        if (err.status === 201) {
          alert('Chaplain deleted Successfully!');
          this.getChaplainList();
        }
      })
    )
  }

  applyFilter(text: any) {
    this.searchText = text;
    this.offset = 0;
    this.adminService.searchTextChanged.next(true);
    this.getChaplainList();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => el.unsubscribe());
  }
}
