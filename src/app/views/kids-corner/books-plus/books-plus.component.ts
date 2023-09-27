import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-books-plus',
  templateUrl: './books-plus.component.html',
  styleUrls: ['./books-plus.component.scss']
})
export class BooksPlusComponent implements OnInit, OnDestroy {

  bookPlusLists: any[] = [];
  isLoading = true;
  subscription: Subscription[] = [];
  limit = 13;
  offset = 1;
  totalRecords = 0;

  constructor(
    private adminService: AdminService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getBooksPlusLists();
  }

  getBooksPlusLists(): void {
    const properties = {
      appSection: 'books',
      propertyType: 'kids'
    }

    this.adminService.getProperties(properties, this.limit, this.offset).subscribe(res => {
      this.isLoading = false;
      this.bookPlusLists = res[0]?.properties;
      this.totalRecords = res[0]?.totalRecords;
    });
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.bookPlusLists[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'books plus' } });
  }

  previousClickEvent(event: boolean): void {
    if (this.offset > 0 && event) {
      this.offset -= 1;
      this.getBooksPlusLists();
    }
  }

  nextClickEvent(event: boolean): void {
    if (event) {
      this.offset += 1;
      this.getBooksPlusLists();
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => el.unsubscribe());
  }
}
