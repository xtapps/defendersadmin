import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { PAGINATION } from 'src/assets/app-constant';
import { EducationModel } from '../model/education.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent extends EducationModel implements OnInit, OnDestroy {

  educations: any[] = [];
  isLoading = true;
  subscriptions: Subscription[] = [];
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
    this.getEducations();
  }

  getEducations(): void {
    this.subscriptions.push(
      this.adminService.getEducations(this.limit, this.offset, this.searchText).subscribe((res: any) => {
        this.isLoading = false;
        this.educations = res.educations;
        this.totalRecords = res.totalCount;
      })
    );
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.educations[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'education' } });
  }

  deleteItem(id: string): void {
    var userResponse = confirm("Do you want to proceed?");
    if (userResponse) {
      this.onDelete(id);
    }
  }

  onDelete(id: string): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.adminService.deleteEducation(id).pipe(
        finalize(() => {this.isLoading = false;})
      ).subscribe(res => {
        this.getEducations();
      }, err => {
        if (err.status === 201) {
          alert('Education deleted Successfully!');
          this.getEducations();
        }
      })
    )
  }  

  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { type: 'education' } });
  }

  editItem(item: any): void {
    const encodedData = encodeURIComponent(JSON.stringify(item));
    this.router.navigate(['admin/add-new'], { state: item, queryParams: { data: encodedData, type: 'education' } });
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getEducations();
  }

  applyFilter(text: any) {
    this.searchText = text;
    this.offset = 0;
    this.adminService.searchTextChanged.next(true);
    this.getEducations();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

}
