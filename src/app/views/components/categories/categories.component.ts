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
  constructor(private adminService: AdminService,
    private router: Router) {
  }
  
  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.adminService.getAllCategories().subscribe((res: any) => {
      this.isLoading = false;
      console.log(res);
    })
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], {queryParams:{type: 'category'}});
  }

  
  goToViePage(): void {
    this.router.navigateByUrl('/view');
  }
}
