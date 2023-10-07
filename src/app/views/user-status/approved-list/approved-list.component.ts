import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-approved-list',
  templateUrl: './approved-list.component.html',
  styleUrls: ['./approved-list.component.scss']
})
export class ApprovedListComponent {

  subscription: Subscription[] = [];
  approvedList: any[] = [];
  limit = 13;
  offset = 0;
  totalRecords = 0;
  isLoading = false

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getApprovedList();
  }

  getApprovedList(): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.getUserStatus(2, this.limit, this.offset).pipe(
        finalize(() => { this.isLoading = false })
      ).subscribe(res => {
        this.approvedList = res.defendersList;
        this.totalRecords = res.totalCount;
      })
    );
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.approvedList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'approved' } });
  }

  previousClickEvent(event: boolean): void {
    if (this.offset > 0 && event) {
      this.offset -= 1;
      this.getApprovedList();
    }
  }

  nextClickEvent(event: boolean): void {
    if (event) {
      this.offset += 1;
      this.getApprovedList();
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
          this.getApprovedList();
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
