import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-franchises-list',
  templateUrl: './franchises-list.component.html',
  styleUrls: ['./franchises-list.component.scss']
})
export class FranchisesListComponent {

  franchisesList: any[]= [];

  constructor(
    private router: Router) {
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { type: 'franchises' } });
  }


  goToViePage(): void {
    this.router.navigateByUrl('/view');
  }

}
