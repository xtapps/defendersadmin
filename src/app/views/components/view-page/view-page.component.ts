import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { s3Url } from 'src/config/config';
import { ImageModalComponent } from '../../user-status/modals/image-modal/image-modal.component';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss']
})
export class ViewPageComponent  implements OnInit, OnDestroy {

  appsList: any[]=[];
  receivedData: any;
  type!: string;
  subscriptions: Subscription[] = [];
  imageName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private dialog: MatDialog,
    private adminService: AdminService
    ) {}

  ngOnInit() {
    // Retrieve the JSON data from the query parameter and decode it
    const encodedData = this.route.snapshot.queryParamMap.get('data');
    this.type = this.route.snapshot.queryParamMap.get('type') || '';
    if (encodedData) {
      this.receivedData = JSON.parse(decodeURIComponent(encodedData));
      if (this.receivedData['Defender Document']) {
        this.imageName = this.receivedData['Defender Document'];
        this.downloadDoc(this.receivedData['Defender Document']);
      }
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

  downloadDoc(defenderDocument: string) {
    this.subscriptions.push(
      this.adminService.getProtectedS3Url(defenderDocument).subscribe(res => {
        this.receivedData['Defender Document'] = res.newUrl;
      }, err => {
        this.receivedData['Defender Document'] = this.imageName;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
