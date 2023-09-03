import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-franchises-list',
  templateUrl: './franchises-list.component.html',
  styleUrls: ['./franchises-list.component.scss']
})
export class FranchisesListComponent implements OnInit {

  franchisesList: any[]= [];
  isLoading = true;

  constructor(
    private adminService: AdminService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getFranchisesList();
  }

  getFranchisesList(): void {
    this.adminService.getFranchises(13, 0).subscribe((res: any) => {
      this.isLoading = false;
      this.franchisesList = res.franchises;
    });
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { type: 'franchises' } });
  }


  goToViewPage(index:number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.franchisesList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData } });
  }

}
