import { Router } from '@angular/router';

export class JobBoardModel {

	constructor(
		public router: Router
	) { }

	parseDataAndNavigate(data: any, type: string, from: string) {
		const tempData = {
			"Website": data.website || data?.websites[0],
			"Logo": data.logo,
			"Title": data.title,
			"description": data.description
		}
		const encodedData = encodeURIComponent(JSON.stringify(tempData));
		this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type, from } });
	}

}
