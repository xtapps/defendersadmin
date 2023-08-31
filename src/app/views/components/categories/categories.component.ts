import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  displayedColumns: string[] = ['address1', 'corpName', 'symbol'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  categories : any[] = [];
  constructor(private adminService: AdminService,
    private router: Router) {
  }
  

  ngOnInit(): void {
    this.getAllCategories();
    this.dataSource = new MatTableDataSource(this.adminService.tempDatas)
  }

  getAllCategories(): void {
    this.adminService.getAllCategories().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.properties)
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
