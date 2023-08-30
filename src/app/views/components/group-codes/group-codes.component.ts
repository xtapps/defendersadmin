import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-codes',
  templateUrl: './group-codes.component.html',
  styleUrls: ['./group-codes.component.scss']
})
export class GroupCodesComponent {

  groupCodes: any[]=[]
  
  constructor(
    private router: Router
  ){}

  addNew(): void {
    this.router.navigate(['/admin/add-new'], {queryParams:{type: 'group-code'}});
  }

  goToViePage(): void {
    this.router.navigateByUrl('/view');
  }

}
