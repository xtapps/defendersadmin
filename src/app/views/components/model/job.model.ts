import { Router } from '@angular/router';

export class JobModel {

	constructor(
		public router: Router
	) { }

	parseDataAndNavigate(data: any, type: string) {
		const tempData = {
			"Job Company": data.jobCompany,
			"Job Company Name": data.jobCompanyName,
			"Job Age": data.jobAge,
			"Logo": data.logo,
			"Title": data.title,
			"Description": data.description,
			"City": data.city,
			"State": data.state,
			"Zip": data.zip,
			"How To Apply": data.howToApply,
			"Education": data.education,
			"Job Type": data.jobType,
			"Salary Range": data.salaryRange,
			"Experience": data.experience,
			"Responsibilities": data.responsibilities,
			"Skills": data.skills,
			"Category": data.category,
			"Notes": data.notes,
			"Expired": data.expired ? 'Yes' : 'No',
			"Job Live": data.jobLive ? 'Yes' : 'No',
			"Salary Range Low": data.salaryRangeLow,
			"Salary Range High": data.salaryRangeHigh,
			"Apply Link": data.applyLink
		};

		const encodedData = encodeURIComponent(JSON.stringify(tempData));
		this.router.navigate(['admin/view'], { queryParams: { data: encodedData, type } });
	}

}
