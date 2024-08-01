import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest/UAH';

  constructor(private http: HttpClient) {}

  getRates(base: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}${base}`)
      .pipe(catchError(this.handleError('getRates', {})));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
