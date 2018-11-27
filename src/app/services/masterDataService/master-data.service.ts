import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SERVER_URL} from '../../Constants/ServerConstants';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/internal/operators';
import {RestaurantDetails} from '../../Model/RestaurantDetails';
import {Settings} from '../../Model/Settings';
import {RestaurantTable} from '../../model/RestaurantTable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  masterDataURL: string = `${SERVER_URL}/master`;

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAllUnitAbbreviations(): Observable<string[]> {
    const url: string = `${this.masterDataURL}/unit/abbreviations`;
    return <Observable<string[]>>this.http.get(url)
      .pipe(
        tap(taxes => console.log(`Fetched unit abbreviations`)),
        // catchError(this.handleError('getAllUnitAbbreviations()', []))
      );
  }

}
