import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.scss']
})
export class WebsitesComponent implements OnInit {
  displayedColumns: string[] = this.adminService.tempColumns;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(private adminService: AdminService,
    private router: Router) {


  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.adminService.tempDatas) 
  }

  
  addNew(): void {
    this.router.navigateByUrl('/admin/add-new')
  }
}
