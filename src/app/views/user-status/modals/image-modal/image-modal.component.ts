import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { url: string },
    private _dialogRef: MatDialogRef<ImageModalComponent>
  ) { }

  close(): void {
    this._dialogRef.close();
  }

}
