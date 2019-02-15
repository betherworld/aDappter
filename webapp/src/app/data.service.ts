/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF any KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {
    private resolveSuffix = '?resolve=true';
    private actionUrl: string;

    constructor(private http: HttpClient) {
        this.actionUrl = '/api/';
    }

    public getAll(ns: string): Observable<any> {
        console.log('GetAll ' + ns + ' to ' + this.actionUrl + ns);
        return this.http.get(`${this.actionUrl}${ns}`)
          .pipe(this.handleError);
    }

    public getSingle(ns: string, id: string): Observable<any> {
        console.log('GetSingle ' + ns);

        return this.http.get(this.actionUrl + ns + '/' + id + this.resolveSuffix)
          .pipe(this.handleError);
    }

    public add(ns: string, asset: any): Observable<any> {
        console.log('Entered DataService add');
        console.log('Add ' + ns);
        console.log('asset', asset);

        return this.http.post(this.actionUrl + ns, asset)
          .pipe(this.handleError);
    }

    public update(ns: string, id: string, itemToUpdate: any): Observable<Object> {
        console.log('Update ' + ns);
        console.log('what is the id?', id);
        console.log('what is the updated item?', itemToUpdate);
        console.log('what is the updated item?', JSON.stringify(itemToUpdate));
        return this.http.put(`${this.actionUrl}${ns}/${id}`, itemToUpdate)
          .pipe(this.handleError);
    }

    public delete(ns: string, id: string): Observable<any> {
        console.log('Delete ' + ns);

        return this.http.delete(this.actionUrl + ns + '/' + id)
          .pipe(this.handleError);
    }

    private handleError(error: any): Observable<any> {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        const errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    private extractData(res: Response): any {
        return res.json();
    }

}
