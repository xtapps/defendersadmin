import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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
  partnerId: string = '';
  partnerUserId: string = '';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog,
    private adminService: AdminService
    ) {}

  ngOnInit() {
    // Retrieve the JSON data from the query parameter and decode it
    const encodedData = this.route.snapshot.queryParamMap.get('data');
    this.type = this.route.snapshot.queryParamMap.get('type') || '';
    const user = this.route.snapshot.queryParamMap.get('user');
    if (encodedData) {
      this.receivedData = JSON.parse(decodeURIComponent(encodedData));
      if (user) {
        this.getDefenderImage(this.receivedData['Document']);
      }
      this.partnerId = this.receivedData.id;
      this.partnerUserId = this.receivedData.partnerUserId;
      delete this.receivedData.id;
      delete this.receivedData.partnerUserId;
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

  openSendPartnerLoginDialog() {
    if (this.receivedData.Email.length <= 2) {
      alert('Email is not valid');
      return;
    }
    const userResponse = confirm("You are granting login authority to the partner. Do you want to proceed?");
    if (userResponse) {
      this.sendPartnerLink();
    }
  }

  sendPartnerLink() {
    const data = {
      partnerId: this.partnerId
    }
    this.subscriptions.push(
      this.adminService.sendPartnerLogin(data).subscribe(res => {
        console.log(res);
        alert('The login link has been sent successfully.')
      }, err => {
        console.log(err)
        if (err.status === 201) {
          alert('The login link has been sent successfully.')
        }
        if (err.error.errCode === "EMAIL_ALREADY_EXISTS") {
          alert('The login link has already been sent.')
        }
      })
    )
  }

  openResendPartnerLoginDialog() {
    if (this.receivedData.Email.length <= 2) {
      alert('Email is not valid');
      return;
    }
    const userResponse = confirm("Are you sure you want to resend the login credentials to the partner?");
    if (userResponse) {
      this.resendPartnerLink();
    }
  }

  resendPartnerLink() {
    const data = {
      partnerId: this.partnerId
    }
    this.subscriptions.push(
      this.adminService.resendPartnerLogin(data).subscribe(res => {
        console.log(res);
        alert('The login link has been sent successfully.')
      }, err => {
        console.log(err)
        if (err.status === 201) {
          alert('The login link has been sent successfully.')
        }
        if (err.error.errCode === "EMAIL_ALREADY_EXISTS") {
          alert('The login link has already been sent.')
        }
      })
    )
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

  getDefenderImage(defenderDocument: string) {
    this.subscriptions.push(
      this.adminService.getProtectedS3Url(defenderDocument).subscribe(res => {
        this.receivedData['Document'] = res.newUrl;
      }, err => {
        this.receivedData['Document'] = this.imageName;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
