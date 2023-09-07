import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-group-codes',
  templateUrl: './group-codes.component.html',
  styleUrls: ['./group-codes.component.scss']
})
export class GroupCodesComponent implements OnInit {

  groupCodes: any[]=[]
  isLoading = true;
  
  constructor(
    private adminService: AdminService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getGroupCodes();
  }

  getGroupCodes(): void {
    this.adminService.getGroupCodes(13, 1).subscribe((res: any) => {
      this.isLoading = false;
      this.groupCodes = res.franchises;
    });
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], {queryParams:{type: 'group-code'}});
  }

  goToViePage(): void {
    this.router.navigateByUrl('/view');
  }

}
