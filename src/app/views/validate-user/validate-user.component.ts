import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-validate-user',
  templateUrl: './validate-user.component.html',
  styleUrls: ['./validate-user.component.scss']
})
export class ValidateUserComponent implements OnDestroy {

  public userType: string = '0';
  public branch: string = 'Army';
  public currentStatus: string = 'Active';
  public area: string = '';
  public heroName: string = '';
  public zipCode: string = '';
  public selectedFile: File | string = '';
  public selectedImageUrl: string = '';
  public dobErrMsg: string = '';
  public dojErrMsg: string = '';
  public dob: Date | string = '';
  public doj: Date | string = '';
  public dos: Date | string = '';
  public subscriptions: Subscription[] = [];

  constructor(private adminService: AdminService) { }

  setUserType(event: string) {
    this.userType = event;
    this.branch = 'Army';
    if (this.userType === '1') {
      this.branch = 'Law Enforcement';
    }
  }

  setBranches(branch: string) {
    this.branch = branch;
  }

  setStatuses(status: string) {
    this.currentStatus = status;
  }

  setArea(area: string) {
    this.area = area;
  }

  updateDetails() {
    this.dobErrMsg = '';
    this.dojErrMsg = '';
    if (this.userType === '0') {
      this.area = '';
    }
    let isErr: boolean = false;
    if (this.userType !== '3') {
      this.heroName = '';
      if (!this.dob || this.dob === '') {
        this.dobErrMsg = 'Please choose date of birth';
        isErr = true;
      }
      if (!this.doj || this.doj === '') {
        this.dojErrMsg = 'Please choose date joined';
        isErr = true;
      }
      if (isErr) {
        return;
      }
    } else {
      this.dob = '';
      this.doj = '';
      this.dos = '';
      this.currentStatus = '';
    }
    const dob = (this.dob && this.dob !== '') ? new Date(this.dob).toString() : '';
    const doj = (this.doj && this.doj !== '') ? new Date(this.doj).toString() : '';
    const dos = (this.dos && this.dos !== '') ? new Date(this.dos).toString() : '';

    let id: any = window.location.hash.split('/');
    id = id[id.length - 1];

    const formData = new FormData();
    formData.append('userType', this.userType);
    formData.append('branch', this.branch);
    formData.append('serviceStatus', this.currentStatus);
    formData.append('serviceArea', this.area);
    formData.append('heroname', this.heroName);
    formData.append('zipcode', this.zipCode);
    formData.append('separationDate', dos);
    formData.append('joinDate', doj);
    formData.append('birthDate', dob);
    formData.append('id', id);
    formData.append('image', this.selectedFile);
    const validateUser = this.adminService.validateUser(formData).subscribe((res: any) => {
      console.log(res);
    }, err => {
      console.log(err);
      if (err.status === 201) {
        alert(err.error.text);
        return;
      }
      alert(err.error);
    })
    this.subscriptions.push(validateUser);
  }

  onFileSelected(event: any): void {
    const selectedFile = event.target.files[0];
    this.handleImage(selectedFile);
  }

  onDragOver(event: any): void {
    event.preventDefault();
  }

  onDrop(event: any): void {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    this.handleImage(selectedFile);
  }

  handleImage(file: File): void {
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.selectedImageUrl = e.target.result;
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  removeSelectedFile() {
    this.selectedFile = '';
    this.selectedImageUrl = '';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
