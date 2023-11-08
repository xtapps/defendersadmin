import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PAGINATION } from '../../../assets/app-constant';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  pageSize: number = PAGINATION.pageSize;

  pageSizeOptions: number[] = PAGINATION.pageSizeOptions;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  @Input() totalRecords: number = 0;

  @Output() pageChangeEventEmit: EventEmitter<any> = new EventEmitter();

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

}
