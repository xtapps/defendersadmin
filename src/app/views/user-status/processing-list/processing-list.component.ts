import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-processing-list',
  templateUrl: './processing-list.component.html',
  styleUrls: ['./processing-list.component.scss']
})
export class ProcessingListComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  processingList: any[] = [];
  limit = 13;
  offset = 1;
  totalRecords = 0;
  isLoading = false

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProcessingList();
  }

  getProcessingList(): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.getUserStatus(0, this.limit, this.offset).pipe(
        finalize(() => { this.isLoading = false })
      ).subscribe(res => {
        this.processingList = res;
      })
    );
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.processingList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'processing' } });
  }

  previousClickEvent(event: boolean): void {
    if (this.offset > 0 && event) {
      this.offset -= 1;
      this.getProcessingList();
    }
  }

  nextClickEvent(event: boolean): void {
    if (event) {
      this.offset += 1;
      this.getProcessingList();
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
          this.getProcessingList();
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }
}
