import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.scss']
})
export class CustomPaginationComponent {

  @Input() currentPage = 1;
  @Input() totalRecords = 0;
  @Input() pageSize = 13;

  @Output() previousClickEvent = new EventEmitter<boolean>();
  @Output() nextClickEvent = new EventEmitter<boolean>();

  previous(): void {
    this.previousClickEvent.emit(true);
  }

  next(): void {
    const lastPage = Math.ceil(this.totalRecords / this.pageSize);
    if (lastPage <= this.currentPage) {
      return;
    }
    this.nextClickEvent.emit(true);
  }

}
