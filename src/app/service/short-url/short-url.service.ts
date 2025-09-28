import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShortUrlService {

  private baseUrl: string = "https://shortlyurl-6uvv.onrender.com/v1/user/url".trim();

  constructor(private http: HttpClient) { }

  // Shorten a long URL
  shortenUrl(longUrl: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/getshort`, { longUrl })
      .pipe(catchError(this.handleError));
  }

  // Get the original long URL from a short code
  getLong(shortCode: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/getlong`, { shortCode })
      .pipe(catchError(this.handleError));
  }

  // Get all URLs
  getAllUrls(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`.trim())
      .pipe(catchError(this.handleError));
  }

  // Delete a short URL
  deleteUrl(shortUrl: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/delete`, { shortUrl })
      .pipe(catchError(this.handleError));
  }

  // Error handler
  private handleError(error: any) {
    console.error('API error occurred:', error);
    return throwError(() => error);
  }
}
