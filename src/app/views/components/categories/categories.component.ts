import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { PAGINATION } from 'src/assets/app-constant';
import { CategoryModel } from '../model/category.model'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends CategoryModel implements OnInit, OnDestroy {

  categories: any[] = [];
  subscription: Subscription[] = [];
  isLoading = true;
  isExpanded = false;
  index = 0;
  public offset: number = PAGINATION.offset;
  totalRecords = 0;
  limit = PAGINATION.limit;
  searchText: any = '';

  constructor(
    private adminService: AdminService,
    public override router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.getAllCategories(this.limit, this.offset, this.searchText).subscribe((res: any) => {
        this.isLoading = false;
        this.categories = res?.categories;
        this.totalRecords = res?.totalCount;
      })
    );
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { type: 'category' } });
  }

  showAll(index: number): void {
    this.index = index;
    this.isExpanded = !this.isExpanded;
  }

  deleteItem(id: string): void {
    var userResponse = confirm("Do you want to proceed?");
    if (userResponse) {
      this.deleteCategoryItem(id);
    }
  }

  deleteCategoryItem(id: string): void {
    this.subscription.push(
      this.adminService.deleteCategory(id).subscribe({
        next: (res => {
          alert('Category deleted Successfully!');
          this.getAllCategories();
        }),
        error: (err => {
          if (err.status === 201) {
            alert('Category deleted Successfully!');
            this.getAllCategories();
          }
        })
      })
    );
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.categories[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'category' } });
  }

  pageChangeEvent(event: any) {
    this.offset = event.offSet;
    this.limit = event.limit;
    this.getAllCategories();
  }

  applyFilter(text: any) {
    this.searchText = text
    this.getAllCategories();
  }

  editItem(ev: any): void {
    this.router.navigate(['/admin/add-new'], {state: ev, queryParams: { type: 'category', editMode: 'true' } });
  }
  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }
}
