// Angular imports
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
// Local imports
import {Company} from '../model/company';
import { Stock } from '../model/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseUrl = 'http://localhost:8000/stocks';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Stock[]> {
    return this.http.get<any>(this.baseUrl);
  }

  get(id: string): Observable<Stock> {
    return this.http.get<any>(this.baseUrl + '/' + id);
  }

  create(country: Stock) {
    return this.http.post<any>(this.baseUrl, country);
  }

  update(id: string, country: Stock): Observable<Stock> {
    return this.http.put<any>(this.baseUrl + '/' + id, country);
  }

  delete(id: string) {
    return this.http.delete<any>(this.baseUrl + '/' + id);
  }
}
