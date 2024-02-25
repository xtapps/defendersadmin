import { Router } from '@angular/router';

export class DefenderModel {

	constructor(
		public router: Router
	) { }

	parseDataAndNavigate(data: any, type: string, user?: any) {
		const tempData = {
			"First Name": data.firstName,
			"Last Name": data.lastName,
			"User Name": data.username,
			"Document": data.defenderDocument,
			"Defender Email": data.defenderEmail,
			"Defender Number": data.defenderNumber,
			"Defender Mil Email": data.defenderMilEmail,
			"Birth Date": data.birthDate ?? '',
			"Hero Name": data.heroname,
			"Highest Rank": data.highestRank,
			"Contact Phone": data.contactPhone,
			"Chat Photo": data.chatPhoto,
			"Branch": data.branch,
			"Service Area": this.getServiceArea(data.serviceArea),
			"Service Status": data.serviceStatus,
			"Service Type": data.serviceType,
			"User Status": this.getUserStatus(data.userStatus),
			"User Type": this.getUserType(data.userType),
			"Zip Code": data.zipcode,
			"Code": data.code,
			"Plus One Code": data.plusOneCode,
			"Validated": data.validated ? 'Yes' : 'No'
		}
		const encodedData = encodeURIComponent(JSON.stringify(tempData));
		this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type, user } });
	}

	getUserType(userType: any) {
		let tempUserType = '';
		switch (userType) {
			case 0:
				tempUserType = 'Veteran/Military';
				break;
			case 1:
				tempUserType = 'First Responder';
				break;
			case 2:
				tempUserType = 'Both';
				break;
			case 3:
				tempUserType = 'FoF';
				break;
			case 4:
				tempUserType = 'Business owner';
				break;
		}
		return tempUserType;
	}

	getUserStatus(userStatus: any) {
		let tempUserStatus = '';
		switch (userStatus) {
			case 0:
				tempUserStatus = 'Signed up not submitted the document';
				break;
			case 1:
				tempUserStatus = 'Submitted';
				break;
			case 2:
				tempUserStatus = 'Approved';
				break;
			case 3:
				tempUserStatus = 'Rejected';
				break;
			case 4:
				tempUserStatus = 'Suspended';
				break;
			case 5:
				tempUserStatus = 'FOF';
				break;
			case 6:
				tempUserStatus = 'Plus One';
				break;
			case 7:
				tempUserStatus = 'Business Contact';
				break;
		}
		return tempUserStatus;
	}

	getServiceArea(serviceArea: any) {
		let tempServiceArea = '';
		switch (serviceArea) {
			case 0:
				tempServiceArea = 'National';
				break;
			case 1:
				tempServiceArea = 'State';
				break;
			case 2:
				tempServiceArea = 'Local';
				break;
		}
		return tempServiceArea;
	}

}
