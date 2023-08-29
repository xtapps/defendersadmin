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
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  @ViewChild(MatSort) sort: MatSort = {} as MatSort;

  public totalRecords: number = 0;

  public pageSize: number = 10;

  public offset: number = 10;

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
    const propSub = this.adminService.getAllProperties(this.pageSize, this.offset, this.searchText).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.properties);
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
    this.router.navigateByUrl('/admin/add-new')
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
