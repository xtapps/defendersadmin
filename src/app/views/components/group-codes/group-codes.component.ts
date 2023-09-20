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

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getGroupCodes();
  }

  getGroupCodes(): void {
    this.adminService.getGroupCodes(13, 1).subscribe((res: any) => {
      this.isLoading = false;
      this.groupCodes = res.groupCodes;
      this.totalCount = res.totalCount;

    });
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

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
