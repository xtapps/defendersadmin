import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-job-boards',
  templateUrl: './job-boards.component.html',
  styleUrls: ['./job-boards.component.scss']
})
export class JobBoardsComponent implements OnInit, OnDestroy {

  jodBoards: any[] = [];
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
    this.getJobBoards();
  }

  getJobBoards(): void {
    this.adminService.getJobBoards(this.limit, this.offset).subscribe((res: any) => {
      this.isLoading = false;
      this.jodBoards = res.jobBoards;
      this.totalRecords = res.totalCount;

    });
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.jodBoards[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'job-boards' } });
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
      this.adminService.deleteJobBoads(id).pipe(
        finalize(() => {this.isLoading = false;})
      ).subscribe(res => {
        if(res.success){
          this.getJobBoards();
        }
      })
    )
  }  

  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { type: 'job-boards' } });
  }

  editItem(item: any): void {
    const encodedData = encodeURIComponent(JSON.stringify(item));
    this.router.navigate(['admin/add-new'], { queryParams: { data: encodedData, type: 'job-boards' } });
  }

  previousClickEvent(event: boolean): void {
    if (this.offset > 0 && event) {
      this.offset -= 1;
      this.getJobBoards();
    }
  }

  nextClickEvent(event: boolean): void {
    if (event) {
      this.offset += 1;
      this.getJobBoards();
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => el.unsubscribe());
  }

}
