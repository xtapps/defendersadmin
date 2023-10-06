import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-franchises-list',
  templateUrl: './franchises-list.component.html',
  styleUrls: ['./franchises-list.component.scss']
})
export class FranchisesListComponent implements OnInit, OnDestroy {

  franchisesList: any[] = [];
  subscription: Subscription[] = [];

  isLoading = true;
  public pageSize: number = 13;
  public offset: number = 0;
  totalCount = 0;

  constructor(
    private adminService: AdminService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getFranchisesList();
  }

  getFranchisesList(): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.getFranchises(this.pageSize, this.offset).subscribe((res: any) => {
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

  previousClickEvent(event: boolean): void {
    if (this.offset > 0 && event) {
      this.offset -= 1;
      // You can add any additional logic here when the "previous" button is clicked.
      this.getFranchisesList();
    }
  }

  nextClickEvent(event: boolean): void {
    if (event) {
      const lastPage = Math.ceil(this.totalCount / this.pageSize);
      if (lastPage <= this.offset) {
        return;
      }
      this.offset += 1;
      this.getFranchisesList();
    }
  }

  deleteItem(id: string): void {
    var userResponse = confirm("Do you want to proceed?");
    if (userResponse) {
      alert("You chose to proceed!");
      return;
      this.deleteFranchises(id);
    }
  }

  deleteFranchises(id: string): void {
    this.subscription.push(
      this.adminService.deleteFranchises(id).subscribe({
        next: (res => {
          if (res) {
            alert('Franchises item deleted Successfully!');
          }
        })
      })
    )
  }

  editItem(item: any): void {
    const encodedData = encodeURIComponent(JSON.stringify(item));
    this.router.navigate(['admin/add-new'], { queryParams: { data: encodedData, type: 'franchises' } });
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
