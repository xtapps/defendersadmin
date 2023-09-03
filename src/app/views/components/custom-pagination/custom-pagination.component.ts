import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.scss']
})
export class CustomPaginationComponent {

  @Output() previousClickEvent = new EventEmitter<boolean>();
  @Output() nextClickEvent = new EventEmitter<boolean>();


  previous(): void{
    this.previousClickEvent.emit(true);
  }
  
  next(): void {
    this.nextClickEvent.emit(true);
  }

}
