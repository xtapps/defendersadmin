import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apps-list',
  templateUrl: './apps-list.component.html',
  styleUrls: ['./apps-list.component.scss']
})
export class AppsListComponent {

  appsList: any[]= [];

  constructor(
    private router: Router) {
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { type: 'app' } });
  }


  goToViePage(): void {
    this.router.navigateByUrl('/view');
  }

}
