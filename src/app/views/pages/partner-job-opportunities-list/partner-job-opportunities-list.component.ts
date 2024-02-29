import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { PAGINATION } from 'src/assets/app-constant';
import { partnerPropertiesModel } from '../model/partnerProperties.model';

@Component({
  selector: 'app-partner-job-opportunities-list',
  templateUrl: './partner-job-opportunities-list.component.html',
  styleUrls: ['./partner-job-opportunities-list.component.scss']
})
export class PartnerJobOpportunitiesListComponent extends partnerPropertiesModel implements OnInit, OnDestroy {

  isLoading = true;
  jobList: any[] = [];
  curId: any;

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  @ViewChild(MatSort) sort: MatSort = {} as MatSort;

  public totalRecords: number = 0;
  public offset: number = PAGINATION.offset;
  limit = PAGINATION.limit;

  searchText: any = '';

  private subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    public override router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs() {
    this.isLoading = true;
    this.subscriptions.push(
      this.adminService.getJobOpportunitiesListByPropertyId(this.limit, this.offset, this.searchText).subscribe((res: any) => {
        this.isLoading = false;
        this.jobList = res?.jobs;
        this.totalRecords = res?.totalRecords;
      })
    );
  }

  applyFilter(text: any) {
    this.searchText = text;
    this.offset = 0;
    this.adminService.searchTextChanged.next(true);
    this.getJobs();
  }

  editItem(job: any): void {
    this.router.navigate(['/partnerDashboard/job'], { queryParams: { jobId: job._id } });
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getJobs();
  }

  viewJob(job: any) {
    this.subscriptions.push(
      this.adminService.getAllCategoryById(job.category).subscribe((res: any) => {
        job.categoryName = res.categoryName;
        this.parseDataAndNavigateForJob(job, 'Job');
      })
    );
  }

  toggleDialog() {
    const button: any = document.getElementsByClassName('modalButton')[0];
    button.click();
  }

  deleteItem(id: any) {
    this.curId = id;
    this.toggleDialog();
    // const userResponse = confirm("Do you want to proceed?");
    // if (userResponse) {
    //   this.onDelete(id);
    // }
  }

  onDelete(id: any) {
    this.toggleDialog();
    this.curId = '';
    this.subscriptions.push(
      this.adminService.deleteJobByPartner(id).subscribe(res => {
        this.offset = 0;
        this.getJobs();
      }, err => {
        console.log(err)
        if (err.status === 201) {
          // alert('Job deleted successfully.');
          const data = {
            type: 'success',
            message: 'Job deleted successfully.'
          };
          this.adminService.alertMessage.next(data);
          this.offset = 0;
          this.getJobs();
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
