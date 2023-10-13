import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  categories: any[] = [];
  subscription: Subscription[] = [];
  isLoading = true;
  isExpanded = false;
  index = 0;
  public pageSize: number = 13;
  public offset: number = 0;
  totalRecords = 0;
  limit = 13;

  constructor(private adminService: AdminService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.getAllCategories(this.pageSize, this.offset).subscribe((res: any) => {
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
      alert("You chose to proceed!");
      this.deleteCategoryItem(id);
    }
  }

  deleteCategoryItem(id: string): void {
    this.subscription.push(
      this.adminService.deleteCategory(id).subscribe({
        next: (res => {
          if (res) {
            alert('Category item deleted Successfully!');
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

  previousClickEvent(event: boolean): void {
    if (this.offset > 0 && event) {
      this.offset -= 1;
      // You can add any additional logic here when the "previous" button is clicked.
      this.getAllCategories();
    }
  }

  nextClickEvent(event: boolean): void {
    if (event) {
      this.offset += 1;
      this.getAllCategories();
    }
  }

  editItem(ev: any): void {
    this.router.navigate(['/admin/add-new'], {state: ev, queryParams: { type: 'category', editMode: 'true' } });
  }
  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }
}
