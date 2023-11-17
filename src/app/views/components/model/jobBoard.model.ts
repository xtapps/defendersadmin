import { Router } from '@angular/router';

export class JobBoardModel {

	constructor(
		public router: Router
	) { }

	parseDataAndNavigate(data: any, type: string) {
		const tempData = {
			"Website": data.website,
			"Logo": data.logo,
			"Title": data.title,
			"description": data.description
		}
		const encodedData = encodeURIComponent(JSON.stringify(tempData));
		this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type } });
	}

}
