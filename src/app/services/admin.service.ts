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

  getAllCategories(limit: number, offset: number) {
    return this.http.get(`${apiUrl}/getCategories?limit=${limit}&offset=${offset}`);
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
    return this.http.get(`${apiUrl}/defender/jobBoard?limit=${limit}&offset=${offset}`);
  }
  
  // getAllDefendersList(){
  //   return this.http.get(`${apiUrl}/getAllDefenders`);
  // }
  
  validateUser(params: any) {
    return this.http.post(`${apiUrl}/validate`, params);
  }

  tempColumns = ['position', 'name', 'weight', 'symbol'];
  tempDatas = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

  //Create

  createPartner(payloadData: any){
    return this.http.post<any>(`${apiUrl}/createProperties`, payloadData);
  }

  // Delete APIS

  deleteCategory(id: string){
    return this.http.delete(`${apiUrl}/admin/removeCategory/ ${id}`);
  }
  


}
