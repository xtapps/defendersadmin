import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { PAGINATION } from 'src/assets/app-constant';
import { BusinessModel } from '../model/business.model';

@Component({
  selector: 'app-franchises-list',
  templateUrl: './franchises-list.component.html',
  styleUrls: ['./franchises-list.component.scss']
})
export class FranchisesListComponent extends BusinessModel implements OnInit, OnDestroy {

  franchisesList: any[] = [];
  subscription: Subscription[] = [];

  isLoading = true;
  public limit: number = PAGINATION.limit;
  public offset: number = PAGINATION.offset;
  totalCount = 0;
  searchText: any = '';

  constructor(
    private adminService: AdminService,
    public override router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.getFranchisesList();
  }

  getFranchisesList(): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.getFranchises(this.limit, this.offset, this.searchText).subscribe((res: any) => {
        this.isLoading = false;
        this.franchisesList = res.franchises;
        this.totalCount = res.totalCount;
      })
    );
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { type: 'franchises' } });
  }


  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.franchisesList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'franchises' } });
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getFranchisesList();
  }

  deleteItem(id: string): void {
    var userResponse = confirm("Do you want to proceed?");
    if (userResponse) {
      this.deleteFranchises(id);
    }
  }

  deleteFranchises(id: string): void {
    this.subscription.push(
      this.adminService.deleteFranchises(id).subscribe({
        next: (res => {
          alert('Franchises deleted Successfully!');
          this.getFranchisesList();
        }),
        error: (err => {
          if (err.status === 201) {
            alert('Franchises deleted Successfully!');
            this.getFranchisesList();
          }
        })
      })
    )
  }

  // editItem(item: any): void {
  //   const encodedData = encodeURIComponent(JSON.stringify(item));
  //   this.router.navigate(['admin/add-new'], { queryParams: { data: encodedData, type: 'franchises' } });
  // }

  editItem(ev: any): void {
    this.router.navigate(['/admin/add-new'], {state: ev, queryParams: { propertyType: 'franchises', orgType: 'commercial', appSection: 'partner', type: 'franchises', editMode: 'true' } });
  }

  applyFilter(text: any) {
    this.searchText = text;
    this.offset = 0;
    this.adminService.searchTextChanged.next(true);
    this.getFranchisesList();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
