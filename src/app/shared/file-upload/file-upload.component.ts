import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { s3Url } from 'src/config/config';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, OnDestroy {

  public imageValidation: boolean = false;

  private subscriptions: Subscription[] = [];

  @Input() fileName: any = null;
  @Input() addClass: any = null;

  @Output() onFileChangeEvent: EventEmitter<any> = new EventEmitter()

  constructor(public adminService: AdminService) {
    this.subscriptions.push(
      adminService.imageValidation.subscribe(res => {
        this.imageValidation = res;
      })
    )
  }

  ngOnInit(): void {
    if (this.fileName.length > 0 && this.fileName.search('https') < 0) {
      this.fileName = `${s3Url}${this.fileName}`;
    }
  }

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files: any = inputElement?.files;
    if (files.length) {
      this.convertToBase64(files[0])
      this.onFileChangeEvent.emit(files[0]);
    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      this.fileName = base64String;
    };
    // Read the file as a data URL (base64)
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.fileName = null;
    this.onFileChangeEvent.emit(null);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
