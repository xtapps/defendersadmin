import { Router } from '@angular/router';

export class CategoryModel {

	constructor(
		public router: Router
	) { }

	parseDataAndNavigate(data: any, type: string) {
		let subCategories = data.subCategories?.map((val: { category: string; }) => {
			return ' ' + val.category
		});
		const tempData = {
			"Category Type": data.categoryType,
			"App Section": data.appSection,
			"Category Icon": data.categoryIcon,
			"Category Name": data.categoryName,
			"Sub Categories": subCategories
		}
		const encodedData = encodeURIComponent(JSON.stringify(tempData));
		this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type } });
	}

}
