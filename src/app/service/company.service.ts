// Angular imports
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
// Local imports
import {Company} from '../model/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl = 'http://localhost:8000/companies';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Company[]> {
    return this.http.get<any>(this.baseUrl);
  }

  get(id: string): Observable<Company> {
    return this.http.get<any>(this.baseUrl + '/' + id);
  }

  create(country: Company) {
    return this.http.post<any>(this.baseUrl, country);
  }

  update(id: string, country: Company): Observable<Company> {
    return this.http.put<any>(this.baseUrl + '/' + id, country);
  }

  delete(id: string) {
    return this.http.delete<any>(this.baseUrl + '/' + id);
  }
}
