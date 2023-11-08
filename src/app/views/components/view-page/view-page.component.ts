import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss']
})
export class ViewPageComponent  implements OnInit{

  appsList: any[]=[];
  receivedData: any;
  type!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
    ) {}

  ngOnInit() {
    // Retrieve the JSON data from the query parameter and decode it
    const encodedData = this.route.snapshot.queryParamMap.get('data');
    this.type = this.route.snapshot.queryParamMap.get('type') || '';
    if (encodedData) {
      this.receivedData = JSON.parse(decodeURIComponent(encodedData));
      console.log(this.receivedData);
    }
  }

  getObjectKeyValues(obj: any): { key: string, value: any }[] {
    return Object.keys(obj).map(key => ({ key, value: obj[key]?.toString().trim() }));
  }

  goBack() {
    this.location.back();
  }

}
