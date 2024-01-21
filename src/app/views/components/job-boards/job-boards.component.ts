import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { PAGINATION } from 'src/assets/app-constant';
import { JobBoardModel } from '../model/jobBoard.model';

@Component({
  selector: 'app-job-boards',
  templateUrl: './job-boards.component.html',
  styleUrls: ['./job-boards.component.scss']
})
export class JobBoardsComponent extends JobBoardModel implements OnInit, OnDestroy {

  jodBoards: any[] = [];
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
    this.getJobBoards();
  }

  getJobBoards(): void {
    this.adminService.getJobBoards(this.limit, this.offset, this.searchText).subscribe((res: any) => {
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
        this.getJobBoards();
      }, err => {
        if (err.status === 201) {
          alert('Job board deleted Successfully!');
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
    this.router.navigate(['admin/add-new'], { state: item, queryParams: { data: encodedData, type: 'job-boards' } });
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getJobBoards();
  }

  applyFilter(text: any) {
    this.searchText = text;
    this.offset = 0;
    this.adminService.searchTextChanged.next(true);
    this.getJobBoards();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => el.unsubscribe());
  }

}
