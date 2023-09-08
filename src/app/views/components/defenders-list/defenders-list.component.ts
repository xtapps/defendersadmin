import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-defenders-list',
  templateUrl: './defenders-list.component.html',
  styleUrls: ['./defenders-list.component.scss']
})
export class DefendersListComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private router: Router) {
  }

  users: any = []
  isLoading = true;
  public pageSize: number = 13;
  public offset: number = 0;

  ngOnInit(): void {
    this.getAllDdefenders();
  }

  getAllDdefenders(): void {
    this.isLoading = true;
    this.adminService.getAllDefendersList(this.pageSize, this.offset).subscribe((res: any) => {
      this.users = res;
      this.isLoading = false;
    })
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { type: 'defenders' } });
  }

  goToViewPage(index: number): void {
    const encodedData = encodeURIComponent(JSON.stringify(this.users[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData } });
  }

  previousClickEvent(event: boolean): void {
    if (this.offset > 0 && event) {
      this.offset -= 1;
      // You can add any additional logic here when the "previous" button is clicked.
      this.getAllDdefenders();
    }
   }

   nextClickEvent(event: boolean): void {
    if(event){
      this.offset += 1;
      this.getAllDdefenders();
    }
   }
}
