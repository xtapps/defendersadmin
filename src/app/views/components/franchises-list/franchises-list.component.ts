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
  public pageSize: number = 13;
  public offset: number = 0;

  constructor(
    private adminService: AdminService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getFranchisesList();
  }

  getFranchisesList(): void {
    this.isLoading = true;
    this.adminService.getFranchises(this.pageSize, this.offset).subscribe((res: any) => {
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

  previousClickEvent(event: boolean): void {
    if (this.offset > 0 && event) {
      this.offset -= 1;
      // You can add any additional logic here when the "previous" button is clicked.
      this.getFranchisesList();
    }
   }

   nextClickEvent(event: boolean): void {
    if(event){
      this.offset += 1;
      this.getFranchisesList();
    }
   }

}
