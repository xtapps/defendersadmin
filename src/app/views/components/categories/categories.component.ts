import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  categories : any[] = [];
  isLoading = true;
  isExpanded = false;
  index = 0;
  public pageSize: number = 13;
  public offset: number = 0;
  constructor(private adminService: AdminService,
    private router: Router) {
  }
  
  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.isLoading = true;
    this.adminService.getAllCategories(this.pageSize, this.offset).subscribe((res: any) => {
      this.isLoading = false;
      this.categories = res.categories;
      console.log(res);
    })
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], {queryParams:{type: 'category'}});
  }

  showAll(index: number): void {
    this.index = index;
    this.isExpanded = !this.isExpanded;
  }

  deleteItem(): void {
    var userResponse = confirm("Do you want to proceed?");

    if (userResponse) {
      alert("You chose to proceed!");
      return;
       this.adminService.deleteCategory('id').subscribe(res => {
        console.log(res);
       })
    } else {
        alert("You chose to cancel.");
    }
  }

  goToViewPage(index:number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.categories[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData } });
  }

  previousClickEvent(event: boolean): void {
    if (this.offset > 0 && event) {
      this.offset -= 1;
      // You can add any additional logic here when the "previous" button is clicked.
      this.getAllCategories();
    }
   }

   nextClickEvent(event: boolean): void {
    if(event){
      this.offset += 1;
      this.getAllCategories();
    }
   }
}
