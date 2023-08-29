import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-defenders-list',
  templateUrl: './defenders-list.component.html',
  styleUrls: ['./defenders-list.component.scss']
})
export class DefendersListComponent implements OnInit {
  constructor(private adminService: AdminService) {
  }

  users: any = []

  ngOnInit(): void {
    this.getAllDdefenders();
  }

  getAllDdefenders(): void {
    this.adminService.getAllDefendersList().subscribe((res: any) => {
      this.users = res;
      console.log(res);
    })
  }

  goToViePage(): void {

  }
}
