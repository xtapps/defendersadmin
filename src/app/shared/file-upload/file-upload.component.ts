import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnDestroy {

  public imageValidation: boolean = false;

  private subscriptions: Subscription[] = [];

  @Input() fileName: any = null;

  @Output() onFileChangeEvent: EventEmitter<any> = new EventEmitter()

  constructor(public adminService: AdminService) {
    this.subscriptions.push(
      adminService.imageValidation.subscribe(res => {
        this.imageValidation = res;
      })
    )
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
