import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-family-of-fallen',
  templateUrl: './family-of-fallen.component.html',
  styleUrls: ['./family-of-fallen.component.scss']
})
export class FamilyOfFallenComponent {

  subscription: Subscription[] = [];
  familyFallenList: any[] = [];
  limit = 13;
  offset = 0;
  totalRecords = 0;
  isLoading = false

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.familyOfFallenList();
  }

  familyOfFallenList(): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.getUserStatus(6 , this.limit, this.offset).pipe(
        finalize(() => { this.isLoading = false })
      ).subscribe(res => {
        this.familyFallenList = res.defendersList;
        this.totalRecords = res.totalCount;
      })
    );
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.familyFallenList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'processing' } });
  }

  previousClickEvent(event: boolean): void {
    if (this.offset > 0 && event) {
      this.offset -= 1;
      this.familyOfFallenList();
    }
  }

  nextClickEvent(event: boolean): void {
    if (event) {
      this.offset += 1;
      this.familyOfFallenList();
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
          this.familyOfFallenList();
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }
}
