import { Router } from '@angular/router';

export class GroupCodeModel {

	constructor(
		public router: Router
	) { }

	parseDataAndNavigate(data: any, type: string) {
		const tempData = {
			"Used Time": data.usedTime,
			"Group Name": data.groupName,
			"Group Code": data.groupCode,
			"Discount Price": data.discountPrice
		};
		const encodedData = encodeURIComponent(JSON.stringify(tempData));
		this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type } });
	}

}
