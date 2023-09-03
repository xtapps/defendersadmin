import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-codes',
  templateUrl: './group-codes.component.html',
  styleUrls: ['./group-codes.component.scss']
})
export class GroupCodesComponent implements OnInit {

  groupCodes: any[]=[]
  isLoading = true;
  
  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], {queryParams:{type: 'group-code'}});
  }

  goToViePage(): void {
    this.router.navigateByUrl('/view');
  }

}
