import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-group-codes',
  templateUrl: './group-codes.component.html',
  styleUrls: ['./group-codes.component.scss']
})
export class GroupCodesComponent implements OnInit, OnDestroy {

  groupCodes: any[] = []
  subscription: Subscription[] = [];
  isLoading = true;
  totalCount = 0;
  limit = 13;
  offset = 0;
  totalRecords = 0;

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getGroupCodes();
  }

  getGroupCodes(): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.getGroupCodes(this.limit, this.offset).subscribe((res: any) => {
        this.isLoading = false;
        this.groupCodes = res?.groupCodes;
        this.totalCount = res?.totalCount;
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
      return;
      this.deleteGroupodeItem(id);
    }
  }

  deleteGroupodeItem(id: string): void {
    this.subscription.push(
      this.adminService.deleteGroupCode(id).subscribe({
        next: (res => {
          if (res) {
            alert('Group Code item deleted Successfully!');
          }
        })
      })
    )
  }

  previousClickEvent(event: boolean): void {
    if (this.offset > 0 && event) {
      this.offset -= 1;
      this.getGroupCodes();
    }
  }

  nextClickEvent(event: boolean): void {
    if (event) {
      this.offset += 1;
      this.getGroupCodes();
    }
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
