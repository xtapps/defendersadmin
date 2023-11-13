import { Router } from '@angular/router';

export class UsersModel {

	constructor(
		public router: Router
	) { }

	parseDataAndNavigate(data: any, type: string) {
		const tempData = {
			"First Name": data.firstName,
			"Last Name": data.lastName,
			"User Name": data.username,
			"Defender Email": data.defenderEmail,
			"Contact Phone": data.contactPhone,
			"Branch": data.branch,
			"Chat Photo": data.chatPhoto,
			"Defender Mil Email": data.defenderMilEmail
		};
		const encodedData = encodeURIComponent(JSON.stringify(tempData));
		this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type } });
	}

}
