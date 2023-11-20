import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {

  @Output() searchEmit = new EventEmitter();

  searchText: any = '';

  applyFilter(event: any) {
    if (event.keyCode === 13) {
      this.searchText = (event.target as HTMLInputElement).value;
      this.searchEmit.emit(this.searchText);
    }
  }

}
