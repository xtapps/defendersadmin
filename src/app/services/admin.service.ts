import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../config/config'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllProperties() {
    console.log(`${apiUrl}/admin/partner/getAllProperties`)
    return this.http.get(`${apiUrl}/admin/partner/getAllProperties`);
  }
}
