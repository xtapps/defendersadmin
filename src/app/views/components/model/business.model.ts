import { Router } from '@angular/router';

export class BusinessModel {

	constructor(
		public router: Router
	) { }

	parseDataAndNavigate(data: any, type: string) {
		const tempData = {
			"Franchise Image": data.franchiseImage,
			"Franchise Name": data.franchiseName,
			"Website": data.website || data?.websites[0]
		}
		const encodedData = encodeURIComponent(JSON.stringify(tempData));
		this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type } });
	}

}
