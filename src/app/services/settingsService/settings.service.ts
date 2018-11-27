import { Injectable } from '@angular/core';
import {SERVER_URL} from '../../Constants/ServerConstants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Settings} from '../../model/Settings';
import {tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settingsURL = `${SERVER_URL}/settings`;

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

  addRestaurantSettings(settings: Settings): Observable<Settings> {
    const url: string = `${this.settingsURL}`;
    return <Observable<Settings>> this.http.post(url, settings, httpOptions)
      .pipe(
        tap(settings => console.log(`Added restaurant settings`)),
        // catchError(this.handleError('addRestaurantSettings()', []))
      );
  }

  updateRestaurantSettings(settings: Settings): Observable<Settings> {
    const url: string = `${this.settingsURL}`;
    return <Observable<Settings>> this.http.put(url, settings, httpOptions)
      .pipe(
        tap(settings => console.log(`Updated restaurant settings`)),
        // catchError(this.handleError('updateRestaurantSettings()', []))
      );
  }

  getRestaurantSettings(): Observable<Settings> {
    const url: string = `${this.settingsURL}`;
    return <Observable<Settings>> this.http.get(url)
      .pipe(
        tap(settings => console.log(`Fetched restaurant settings`)),
        // catchError(this.handleError('getRestaurantSettings()', []))
      );
  }

}
