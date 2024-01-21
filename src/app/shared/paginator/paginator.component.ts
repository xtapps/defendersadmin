import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { PAGINATION } from '../../../assets/app-constant';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnDestroy {

  pageSize: number = PAGINATION.pageSize;

  pageSizeOptions: number[] = PAGINATION.pageSizeOptions;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  @Input() totalRecords: number = 0;

  @Output() pageChangeEventEmit: EventEmitter<any> = new EventEmitter();

  subscriptions: Subscription[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.adminService.searchTextChanged.subscribe(res => {
        if (res) {
          this.paginator?.firstPage();
        }
      })
    );
  }

  pageChange(event: any) {
    const offSet = event.pageIndex * event.pageSize;
    if (offSet >= this.totalRecords) {
      return;
    }
    const data = {
      offSet,
      limit: event.pageSize
    }
    this.pageChangeEventEmit.emit(data);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
