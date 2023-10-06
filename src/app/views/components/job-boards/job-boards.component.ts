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

  constructor(
    private adminService: AdminService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getJobBoards();
  }

  getJobBoards(): void {
    this.adminService.getJobBoards(13, 1).subscribe((res: any) => {
      this.isLoading = false;
      this.jodBoards = res.jobBoards;
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
      alert("You chose to proceed!");
      return;
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

  ngOnDestroy(): void {
    this.subscription.forEach(el => el.unsubscribe());
  }

}
