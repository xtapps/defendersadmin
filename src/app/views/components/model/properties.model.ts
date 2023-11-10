import { Router } from '@angular/router';

export class PropertiesModel {

	constructor(
		public router: Router
	) { }

	parseDataAndNavigate(partner: any, type: string) {
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
			"State": partner.state,
			"Country": partner.country,
			"Zip": partner.zip,
			"Phone": partner.phone,
			"Website": partner.website,
			"Email": partner.email,
			"Local Contact": partner.localContact,
			"Franchise Tag": partner.franchiseTag,
			"Umbrella Tag": partner.umbrellaTag,
			"License Number": partner.licenseNumber,
			"Organization Type": partner.orgType,
			"Description": partner.description,
			"Discount": partner.discount,
			"Discount Disclaimer": partner.discountDisclaimer
		}
		const encodedData = encodeURIComponent(JSON.stringify(tempData));
		this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type } });
	}

}
