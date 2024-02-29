import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../config/config'
import { Observable, Subject } from 'rxjs';
import { IApiRes } from '../models/model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public searchTextChanged: Subject<boolean> = new Subject();

  public imageValidation: Subject<boolean> = new Subject();

  public alertMessage: Subject<any> = new Subject();

  public showLoader: Subject<boolean> = new Subject();

  constructor(private http: HttpClient, private router: Router) { }

  getAllProperties(limit: number, offset: number, text: string) {
    return this.http.get(`${apiUrl}/admin/partner/getAllProperties`, {
      params: {
        limit,
        offset,
        text
      }
    });
  }

  getLocations(limit: number, offset: number, text: string) {
    const url = `${apiUrl}/properties/viewAll?reqParams=[ {"value": "partner", "key": "appSection"}, {"value": "service", "key": "propertyType"}]&limit=${limit}&offset=${offset}&text=${text}`;
    return this.http.get(url);
  }

  getWebsites(limit: number, offset: number, text: string) {
    const url = `${apiUrl}/websites?reqParams=[{"value": "false", "key": "featured"}, {"value": "website", "key": "propertyType"}]&limit=${limit}&offset=${offset}&text=${text}`;
    return this.http.get(url);
  }

  getApps(limit: number, offset: number, text: string) {
    const url = `${apiUrl}/properties/viewAll?reqParams=[{"value": "false", "key": "featured"}, {"value": "app", "key": "propertyType"}]&limit=${limit}&offset=${offset}&text=${text}`;
    return this.http.get(url);
  }

  getFranchises(limit: number, offset: number, text: string) {
    const url = `${apiUrl}/defender/franchises?reqParams=[{"value": "false", "key": "featured"}, {"value": "franchises", "key": "propertyType"}]&limit=${limit}&offset=${offset}&text=${text}`;
    return this.http.get(url);
  }

  getAllCategories(limit: number, offset: number, text: string = '') {
    return this.http.get(`${apiUrl}/getCategories?limit=${limit}&offset=${offset}&text=${text}`);
  }

  getAllCategoryById(id: string = '') {
    return this.http.get(`${apiUrl}/getCategoryById?id=${id}`);
  }


  getGroupCodes(limit: number, offset: number, text: string = '') {
    return this.http.get(`${apiUrl}/getGroupCodes?limit=${limit}&offset=${offset}&text=${text}`);
  }

  getAllDefendersList(limit: number, offset: number, sortOrder?: string) {
    return this.http.get(`${apiUrl}/getAllDefenders?userStatus=2&limit=${limit}&offset=${offset}&sortOrder=${sortOrder}`);
  }

  getJobOpportunities(limit: number, offset: number, text: string = '') {
    return this.http.get(`${apiUrl}/defender/jobs?limit=${limit}&offset=${offset}&text=${text}`);
  }

  getJobBoards(limit: number, offset: number, text: string = '') {
    return this.http.get(`${apiUrl}/getJobBoard?limit=${limit}&offset=${offset}&text=${text}`);
  }

  getMilitary(limit: number, offset: number) {
    const url = `${apiUrl}/properties/viewAll?reqParams=[{"value": "false", "key": "featured"}, {"value": "military", "key": "charity"}]&limit=${limit}&offset=${offset}`;
    return this.http.get(url);
  }
  getMilitary12(limit: number, offset: number) {
    const url = `${apiUrl}/properties/viewAll?reqParams=[{"key":"appSection","value":"books"},{"key":"propertyType","value":"kids"}]&limit=${limit}&offset=${offset}`;
    return this.http.get(url);
  }

  getPartners(limit: number, offset: number, text: string, sortOrder?: string) {
    const url = `${apiUrl}/properties/viewAll?reqParams=[{"key":"appSection","value":"partner"},{"key":"propertyType","value":"partner"}]&limit=${limit}&offset=${offset}&text=${text}&sortOrder=${sortOrder}`;
    return this.http.get(url);
  }

  getResourcesForAdmin(limit: number, offset: number, text: string = '', appSection: string, propertyType?: string): Observable<any> {
    return this.http.get<any>(`${apiUrl}/partner/getSupportForAdmin?limit=${limit}&offset=${offset}&text=${text}&appSection=${appSection}&propertyType=${propertyType ?? ''}`);
  }

  /**
   * Retrieves properties based on the specified application section, property type, limit, and offset.
   *
   * @param {string} appSection - The application section to filter properties.
   * @param {string} propertyType - The type of properties to retrieve.
   * @param {number} limit - The maximum number of properties to return.
   * @param {number} offset - The number of properties to skip before starting to return the properties.
   * 
   * @returns {Observable<any>} An observable that emits the response containing the properties.
   */
  getProperties(properties: { appSection: string, propertyType: string }, limit: number, offset: number, text: string = ''): Observable<IApiRes[]> {
    return this.http.get<IApiRes[]>(`${apiUrl}/properties/viewAll?reqParams=[{"key":"appSection","value":"${properties.appSection}"},{"key":"propertyType","value":"${properties.propertyType}"}]&limit=${limit}&offset=${offset}&text=${text}`);
  }

  getUserStatus(status: number, limit: number, offset: number, userType?: number, text: string = '', sortOrder?: string): Observable<any> {
    return this.http.get<any>(`${apiUrl}/getAllDefenders?userStatus=${status}&limit=${limit}&offset=${offset}&userType=${userType}&text=${text}&sortOrder=${sortOrder}`);
  }

  updateUserStatus(paylodData: any): Observable<any>{
    return this.http.post<any>(`${apiUrl}/updateUser`, paylodData);
  }

  validateUser(params: any) {
    return this.http.post(`${apiUrl}/validate`, params);
  }

  tempColumns = ['position', 'name', 'weight', 'symbol'];
  tempDatas = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];

  //Create

  createPartner(payloadData: any) {
    return this.http.post<any>(`${apiUrl}/createProperties`, payloadData);
  }

  createFranchises(payloadData: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/createFranchises`, payloadData);
  }

  uploadProfile(payloadData: FormData) {
    return this.http.post<any>(`${apiUrl}/admin/partner/uploadProfile`, payloadData);
  }

  createJobBoards(payloadData: FormData): Observable<any>{
    return this.http.post<any>(`${apiUrl}/createJobBoard`, payloadData);
  }

  updateJobBoard(payloadData: FormData): Observable<any>{
    return this.http.post<any>(`${apiUrl}/updateJobBoard`, payloadData);
  }

  createProperties(payloadData: any): Observable<any>{
    return this.http.post<any>(`${apiUrl}/createProperties`, payloadData);
  }

  updateProperties(payloadData: any): Observable<any>{
    return this.http.post<any>(`${apiUrl}/updateProperties`, payloadData);
  }

  // Delete APIS

  deleteCategory(id: string) {
    const deleteId = {
      id: id
    };
    return this.http.delete(`${apiUrl}/admin/removeCategory`, { body: deleteId });
  }

  deleteGroupCode(id: string) {
    const deleteId = {
      id: id
    };
    return this.http.delete(`${apiUrl}/admin/removeGroupCode`, { body: deleteId });
  }

  deleteFranchises(id: string) {
    const deleteId = {
      id
    };
    return this.http.delete(`${apiUrl}/admin/removeFranchises`, { body: deleteId });
  }

  deleteProperty(id: string) {
    const deleteId = {
      id
    };
    return this.http.delete(`${apiUrl}/admin/removeProperty`, { body: deleteId })
  }


  deleteProperties(id: string): Observable<any> {
    const payload = {
      id
    }
    return this.http.delete<any>(`${apiUrl}/admin/removeProperty`, { body: payload });
  }

  deleteJobBoads(id: string): Observable<any> {
    const payload = {
      id
    }
    return this.http.delete<any>(`${apiUrl}/removeJobBoard`, { body: payload });
  }

  deleteJob(id: string): Observable<any> {
    const payload = {
      id
    }
    return this.http.delete<any>(`${apiUrl}/removeJob`, { body: payload });
  }

  // updated Section

  updateFranchises(body: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/updateFranchises`, body);
  }

  updateCategories(body: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/updateCategories`, body);
  }

  createCategory(data: any): Observable<any>{
    return this.http.post<any>(`${apiUrl}/createCategories`, data);
  }

  updateCategory(data: any): Observable<any>{
    return this.http.post<any>(`${apiUrl}/updateCategories`, data);
  }
  login(payloadData: any) {
    return this.http.post<any>(`${apiUrl}/defender/login`, payloadData);
  }

  updateUserDetails(data: any): Observable<any>{
    return this.http.post<any>(`${apiUrl}/admin/updateUser`, data);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
    this.router.navigate(['/login']);
  }

  getProtectedS3Url(data: any): Observable<any> {
    return this.http.get<any>(`${apiUrl}/admin/protectedS3Url?url=${data}`);
  }

  deleteUser(params: {id: string}) {
    return this.http.delete(`${apiUrl}/admin/removeUser`, {body: params});
  }

  getAllPropertiesCountByCategory() {
    return this.http.get<any>(`${apiUrl}/allPropertiesCountByCategory`);
  }

  getPropertyById(id: string) {
    return this.http.get<any>(`${apiUrl}/getPropertyById?id=${id}`);
  }

  createGroupCode(payloadData: any): Observable<any>{
    return this.http.post<any>(`${apiUrl}/createGroupCode`, payloadData);
  }

  updateGroupCode(body: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/updateGroupCodes`, body);
  }

  getAdminUsers() {
    return this.http.get(`${apiUrl}/getAdminUsers`);
  }

  // Educations

  getEducations(limit: number, offset: number, text: string = '') {
    return this.http.get(`${apiUrl}/getEducations?limit=${limit}&offset=${offset}&text=${text}`);
  }

  deleteEducation(id: string): Observable<any> {
    const payload = {
      id
    }
    return this.http.delete<any>(`${apiUrl}/removeEducation`, { body: payload });
  }

  createEducation(payloadData: FormData): Observable<any>{
    return this.http.post<any>(`${apiUrl}/createEducation`, payloadData);
  }

  updateEducation(payloadData: FormData): Observable<any>{
    return this.http.post<any>(`${apiUrl}/updateEducation`, payloadData);
  }

  sendPartnerLogin(payload: any): Observable<any>{
    return this.http.post<any>(`${apiUrl}/createPartnerLogin`, payload);
  }

  resendPartnerLogin(payload: any): Observable<any>{
    return this.http.post<any>(`${apiUrl}/resendPartnerLogin`, payload);
  }

  partnerLogin(payload: any): Observable<any>{
    return this.http.post<any>(`${apiUrl}/partnerLogin`, payload);
  }

  getPropertiesListByPartnerId(limit: number, offset: number, searchText: string = ''): Observable<any>{
    return this.http.get<any>(`${apiUrl}/partner/getPropertiesListByPartnerId?limit=${limit}&offset=${offset}&searchText=${searchText}`);
  }

  getPropertyByPartnerId(propertyId: any): Observable<any>{
    return this.http.get<any>(`${apiUrl}/partner/getPropertyByPartnerId?propertyId=${propertyId}`);
  }

  updatePartnerProperty(payload: any): Observable<any>{
    return this.http.post<any>(`${apiUrl}/partner/updateProperty`, payload);
  }

  partnerLogout(payload: any): Observable<any>{
    return this.http.post<any>(`${apiUrl}/partner/partnerLogout`, payload);
  }

  createJobOpportunity(payloadData: FormData): Observable<any>{
    return this.http.post<any>(`${apiUrl}/createJob`, payloadData);
  }

  updateJobOpportunity(payloadData: FormData): Observable<any>{
    return this.http.post<any>(`${apiUrl}/partner/updateJob`, payloadData);
  }

  getJobOpportunitiesListByPropertyId(limit: number, offset: number, searchText: string = ''): Observable<any>{
    return this.http.get<any>(`${apiUrl}/partner/getJobOpportunitiesListByPropertyId?limit=${limit}&offset=${offset}&searchText=${searchText}`);
  }

  getJobById(jobId: any): Observable<any>{
    return this.http.get<any>(`${apiUrl}/partner/getJobById?jobId=${jobId}`);
  }

  deleteJobByPartner(id: string): Observable<any> {
    const payload = {
      id
    }
    return this.http.delete<any>(`${apiUrl}/partner/removeJob`, { body: payload });
  }

}
