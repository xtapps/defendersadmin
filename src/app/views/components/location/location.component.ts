import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  displayedColumns: string[] = ['address1', 'corpName', 'symbol'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  locationList: any[]= [];
  constructor(private adminService: AdminService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.getAllLocation();
    this.dataSource = new MatTableDataSource(this.adminService.tempDatas)
  }

  getAllLocation(): void {
    this.adminService.getLocations().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.properties)
      console.log(res);
    })
  }

  addNew(): void {
    this.router.navigate(['/admin/add-new'], {queryParams:{type: 'location'}});
  }

  goToViePage(): void {
    this.router.navigateByUrl('/view');
  }

}
