import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest/';

  constructor(private http: HttpClient) {}

  getRates(baseCurrency: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${baseCurrency}`);
  }
}
