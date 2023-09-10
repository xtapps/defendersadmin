import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [
    'corpName',
    'locationName',
    'address1',
    'city',
    'state',
    'zip',
    'phone',
  ];
  isLoading = true;
  partnersList: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  @ViewChild(MatSort) sort: MatSort = {} as MatSort;

  public totalRecords: number = 0;
  public pageSize: number = 13;
  public offset: number = 0;

  private searchText: string = '';

  private subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllProperties();
  }

  getAllProperties() {
    this.isLoading = true;
    const propSub = this.adminService.getAllProperties(this.pageSize, this.offset, this.searchText).subscribe((res: any) => {
      this.isLoading = false;
      this.partnersList = res.properties;
      this.totalRecords = res.totalRecords;
    });

    this.subscriptions.push(propSub);
  }

  applyFilter(event: any) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
    if (event.keyCode === 13) {
      this.searchText = (event.target as HTMLInputElement).value;
      this.getAllProperties();
    }
  }

  onPageChange(event: any) {
    const offset = (event.previousPageIndex + 1) * this.pageSize;
    this.offset = offset + 1;
    this.getAllProperties();
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], {queryParams:{type: 'partner'}});
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.partnersList[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData } });
   }

   previousClickEvent(event: boolean): void {
    if (this.offset > 0 && event) {
      this.offset -= 1;
      // You can add any additional logic here when the "previous" button is clicked.
      this.getAllProperties();
    }
   }

   nextClickEvent(event: boolean): void {
    if(event){
      this.offset += 1;
      this.getAllProperties();
    }
   }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
