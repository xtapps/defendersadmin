import { Router } from '@angular/router';

export class PropertiesModel {

	constructor(
		public router: Router
	) { }

	parseDataAndNavigate(partner: any, type: string, from?: string) {
		const tempData = {
			"Location Name": partner.locationName,
			"Location Image": partner.locationImage,
			"Images": partner.images,
			"Corporation Name": partner.corpName,
			"Property Type": partner.propertyType,
			"App Section": partner.appSection,
			"Featured": partner.featured ? 'Yes' : 'No',
			"Android URL": partner.androidURL,
			"Apple URL": partner.appleURL,
			"Address 1": partner.address1,
			"Address 2": partner.address2,
			"County": partner.county,
			"City": partner.city,
			"State": partner.state,
			"Country": partner.country,
			"Zip": partner.zip,
			"Phone": partner.phone,
			"Website": partner?.website[0] || (partner?.websites?.length && partner?.websites[0]),
			"Email": partner.email,
			"Local Contact": partner.localContact,
			"Franchise Tag": partner.franchiseTag,
			"Umbrella Tag": partner.umbrellaTag,
			"License Number": partner.licenseNumber,
			"Organization Type": partner.orgType,
			"Description": partner.description,
			"Discount": partner.discount,
			"Discount Disclaimer": partner.discountDisclaimer,
			"id": partner._id,
			"partnerUserId": partner.partnerUserId
		}
		const encodedData = encodeURIComponent(JSON.stringify(tempData));
		this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type, from } });
	}

}
