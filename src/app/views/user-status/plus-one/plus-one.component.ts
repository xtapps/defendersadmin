import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-plus-one',
  templateUrl: './plus-one.component.html',
  styleUrls: ['./plus-one.component.scss']
})
export class PlusOneComponent implements OnInit, OnDestroy{

  subscription: Subscription[] = [];
  plusOneList: any[] = [];
  limit = 13;
  offset = 0;
  totalRecords = 0;
  isLoading = false

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPlusOneList();
  }

  getPlusOneList(): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.getUserStatus(5, this.limit, this.offset).pipe(
        finalize(() => { this.isLoading = false })
      ).subscribe(res => {
        this.plusOneList = res.defendersList;
        this.totalRecords = res.totalCount;
      })
    );
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.plusOneList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'plus one' } });
  }

  previousClickEvent(event: boolean): void {
    if (this.offset > 0 && event) {
      this.offset -= 1;
      this.getPlusOneList();
    }
  }

  nextClickEvent(event: boolean): void {
    if (event) {
      this.offset += 1;
      this.getPlusOneList();
    }
  }
  
  deleteItem(id: string): void {
    var userResponse = confirm("Do you want to proceed?");
    if (userResponse) {
      alert("You chose to proceed!");
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
          this.getPlusOneList();
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }



}
