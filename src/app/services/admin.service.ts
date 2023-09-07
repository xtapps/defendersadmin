import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../config/config'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllProperties(limit: number, offset: number, text: string) {
    return this.http.get(`${apiUrl}/admin/partner/getAllProperties`, {
      params: {
        limit,
        offset,
        text
      }
    });
  }

  getLocations(limit: number, offset: number) {
    const url = `${apiUrl}/properties/viewAll?reqParams=[{"value": "false", "key": "featured"}, {"value": "partner", "key": "propertyType"}]&limit=${limit}&offset=${offset}`;
    return this.http.get(url);
  }

  getWebsites(limit: number, offset: number) {
    const url = `${apiUrl}/properties/viewAll?reqParams=[{"value": "false", "key": "featured"}, {"value": "website", "key": "propertyType"}]&limit=${limit}&offset=${offset}`;
    return this.http.get(url);
  }

  getApps(limit: number, offset: number) {
    const url = `${apiUrl}/properties/viewAll?reqParams=[{"value": "false", "key": "featured"}, {"value": "app", "key": "propertyType"}]&limit=${limit}&offset=${offset}`;
    return this.http.get(url);
  }

  getFranchises(limit: number, offset: number) {
    const url = `${apiUrl}/defender/franchises?reqParams=[{"value": "false", "key": "featured"}, {"value": "franchises", "key": "propertyType"}]&limit=${limit}&offset=${offset}`;
    return this.http.get(url);
  }

  getAllCategories() {
    return this.http.get(`${apiUrl}/getCategories?limit=10`);
  }


  getGroupCodes(limit: number, offset: number) {
    return this.http.get(`${apiUrl}/getGroupCodes?limit=${limit}&offset=${offset}`);
  }

  getAllDefendersList(limit: number, offset: number) {
    return this.http.get(`${apiUrl}/getAllDefenders?limit=${limit}&offset=${offset}`);
  }

  getJobOpportunities(limit: number, offset: number){
    return this.http.get(`${apiUrl}/defender/jobs?limit=${limit}&offset=${offset}`);
  }

  getJobBoards(limit: number, offset: number){
    return this.http.get(`${apiUrl}defender/jobBoard?limit=${limit}&offset=${offset}`);
  }

}
