import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  propertyType!: string;

  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.propertyType = this.activatedRoute.snapshot.queryParams['type'];
  }

}
