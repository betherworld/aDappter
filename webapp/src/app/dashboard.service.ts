import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Project, Emission, Token } from "./org.energy.network";
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DashboardService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  private url = "http://10.4.13.143:3000/api/";
  constructor(private http: HttpClient) {}

  getEmissions(): Observable<Emission[]> {
    return this.http
      .get<Emission[]>(this.url + "Emission", this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getTokens(id): Observable<Token[]> {
    return this.http
      .get<Token[]>(this.url + "getTokens/" + id, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<any> {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = error.message
      ? error.message
      : error.status
      ? `${error.status} - ${error.statusText}`
      : "Server error";
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
