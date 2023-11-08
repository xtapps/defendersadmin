import { Router } from '@angular/router';

export class DefenderModel {

	constructor(
    public router: Router
  ) { }

	parseDataAndNavigate(data: any, type: string) {
		const tempData = {
			"Chat Photo": data.chatPhoto,
			"Zip Code": data.zipcode,
			"Contact Phone": data.contactPhone,
			"Hero Name": data.heroname,
			"Branch": data.branch,
			"Defender Document": data.defenderDocument,
			"Highest Rank": data.highestRank,
			"First Name": data.firstName,
			"Last Name": data.lastName,
			"User Name": data.username,
			"Defender Email": data.defenderEmail,
		}
		const encodedData = encodeURIComponent(JSON.stringify(tempData));
		this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type } });
	}

}
