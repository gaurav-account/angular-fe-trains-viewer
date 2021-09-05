import { Injectable } from '@angular/core';
import{HttpClient,HttpErrorResponse,HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import{HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  sample:any;
  station_info_url='http://localhost:8000/departures/v1/api/'


  constructor(private http:HttpClient) { }

  setHeaders():HttpHeaders{
    let headers: HttpHeaders = new HttpHeaders().set('Access-Control-Allow-Headers','Content-Type,Authorization')
    headers.append('Access-Control-Allow-Origin','*')
    headers.append('Content-Type','application/json')
    headers.append('Access-Control-Allow-Credentials','true')
    headers.append('Access-Control-Allow-Methods','*')
    return headers
  }

  callService(station_name): Observable<any> {
    const params = new HttpParams()
    .set('station', station_name);
     const httpOptions = {
       headers: this.setHeaders(),
       params: params
     }

if (station_name=='Den Haag Centraal') {
  return this.http.get(this.station_info_url+'GVC',httpOptions).pipe(catchError(this.errorHandler));
} else {
  return this.http.get(this.station_info_url,httpOptions).pipe(catchError(this.errorHandler));
}


  }
  errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      console.error('An error occurred:', error.error.message);
    } else {

      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    return throwError(
      'Something bad happened; please try again later.');
  }
}
