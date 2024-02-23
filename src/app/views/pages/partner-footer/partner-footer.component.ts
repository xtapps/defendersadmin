import { Component } from '@angular/core';
import { FooterComponent } from '@coreui/angular';

@Component({
  selector: 'app-partner-footer',
  templateUrl: './partner-footer.component.html',
  styleUrls: ['./partner-footer.component.scss'],
})
export class PartnerFooterComponent extends FooterComponent {
  constructor() {
    super();
  }
}
