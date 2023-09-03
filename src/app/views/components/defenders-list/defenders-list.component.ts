import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-defenders-list',
  templateUrl: './defenders-list.component.html',
  styleUrls: ['./defenders-list.component.scss']
})
export class DefendersListComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private router: Router) {
  }

  users: any = []
  isLoading = true;

  ngOnInit(): void {
    this.getAllDdefenders();
  }

  getAllDdefenders(): void {
    this.adminService.getAllDefendersList(13, 1).subscribe((res: any) => {
      this.users = res;
      this.isLoading = false;
    })
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], { queryParams: { type: 'defenders' } });
  }

  goToViePage(): void {

  }
}
