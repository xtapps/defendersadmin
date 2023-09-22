import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent {
  jodBoards: any[] = [];
  isLoading = true;
  subscription: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getJobBoards();
  }

  getJobBoards(): void {
    this.adminService.getMilitary(13, 1).subscribe((res: any) => {
      this.isLoading = false;
      this.jodBoards = res.jobBoards;
    });
  }

  goToViewPage(index: number): void {
    // Encode the JSON data and navigate to ViewComponent with it as a query parameter
    const encodedData = encodeURIComponent(JSON.stringify(this.jodBoards[index]));
    this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type: 'job-boards' } });
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => el.unsubscribe());
  }
}
