import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { s3Url } from 'src/config/config';
import { ImageModalComponent } from '../../user-status/modals/image-modal/image-modal.component';

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
    private location: Location,
    private dialog: MatDialog
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

  getImage(image: string) {
    if (image.search('https') < 0) {
      return `${s3Url}${image}`;
    }
    return image;
  }

  viewImage(url: string) {
    this.dialog.open(ImageModalComponent, {
      width: '50%',
      data: {
        url
      }
    });
  }

}
