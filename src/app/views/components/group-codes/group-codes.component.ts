import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { PAGINATION } from 'src/assets/app-constant';
import { GroupCodeModel } from '../model/groupCode.model';

@Component({
  selector: 'app-group-codes',
  templateUrl: './group-codes.component.html',
  styleUrls: ['./group-codes.component.scss']
})
export class GroupCodesComponent extends GroupCodeModel implements OnInit, OnDestroy {

  groupCodes: any[] = []
  subscription: Subscription[] = [];
  isLoading = true;
  limit = PAGINATION.limit;
  offset = PAGINATION.offset;
  totalRecords = 0;

  constructor(
    private adminService: AdminService,
    public override router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.getGroupCodes();
  }

  getGroupCodes(): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.getGroupCodes(this.limit, this.offset).subscribe((res: any) => {
        this.isLoading = false;
        this.groupCodes = res?.groupCodes;
        this.totalRecords = res?.totalCount;
      })
    );
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { type: 'group-code' } });
  }

  goToViePage(): void {
    this.router.navigateByUrl('/view');
  }

  deleteItem(id: string): void {
    var userResponse = confirm("Do you want to proceed?");
    if (userResponse) {
      this.deleteGroupodeItem(id);
    }
  }

  deleteGroupodeItem(id: string): void {
    this.subscription.push(
      this.adminService.deleteGroupCode(id).subscribe({
        next: (res => {
          alert('Group Code deleted Successfully!');
          this.getGroupCodes();
        }),
        error: (err => {
          if (err.status === 201) {
            alert('Location deleted Successfully!');
            this.getGroupCodes();
          }
        })
      })
    )
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getGroupCodes();
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.groupCodes[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'group-code' } });
  }

  editItem(ev: any): void {
    this.router.navigate(['/admin/add-new'], {state: ev, queryParams: { type: 'group-code', editMode: 'true' } });
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
