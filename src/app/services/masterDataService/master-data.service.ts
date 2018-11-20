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

  /////  Master categories
/*
  getAllMasterCategories(): Observable<MasterCategory[]>  {
    const url: string = `${this.masterDataURL}/masterCategory/all`;
    return <Observable<MasterCategory[]>>this.http.get(url)
      .pipe(
        tap(masterCategories => console.log(`Fetched master categories`)),
        // catchError(this.handleError('getAllMasterCategories()', []))
      );
  }
*/

  /////  Currency
/*
  getActiveCurrency(): Observable<Currency>  {
    const url: string = `${this.masterDataURL}/currency/active`;
    return <Observable<Currency>>this.http.get<Currency>(url)
      .pipe(
        tap(currency => console.log(`Fetched currency`)),
        // catchError(this.handleError('getActiveCurrency()', []))
      );
  }
*/

  /////  Unit

  getAllUnitAbbreviations(): Observable<string[]> {
    const url: string = `${this.masterDataURL}/unit/abbreviations`;
    return <Observable<string[]>>this.http.get(url)
      .pipe(
        tap(taxes => console.log(`Fetched unit abbreviations`)),
        // catchError(this.handleError('getAllUnitAbbreviations()', []))
      );
  }

  ///// Restaurant details

  getRestaurantDetails(): Observable<RestaurantDetails> {
    const url: string = `${this.masterDataURL}/restaurant`;
    return <Observable<RestaurantDetails>> this.http.get(url)
      .pipe(
        tap(restaurantDetails => console.log(`Fetched restaurant details`)),
        // catchError(this.handleError('getRestaurantDetails()', []))
      );
  }

  addRestaurantDetails(restaurantDetails: RestaurantDetails): Observable<RestaurantDetails> {
    const url: string = `${this.masterDataURL}/restaurant`;
    return <Observable<RestaurantDetails>> this.http.post(url, restaurantDetails, httpOptions)
      .pipe(
        tap(restaurantDetails => console.log(`Added restaurant details`)),
        // catchError(this.handleError('addRestaurantDetails()', []))
      );
  }

  updateRestaurantDetails(restaurantDetails: RestaurantDetails): Observable<RestaurantDetails> {
    const url: string = `${this.masterDataURL}/restaurant`;
    return <Observable<RestaurantDetails>> this.http.put(url, restaurantDetails, httpOptions)
      .pipe(
        tap(restaurantDetails => console.log(`Updated restaurant details`)),
        // catchError(this.handleError('updateRestaurantDetails()', []))
      );
  }

  addRestaurantSettings(settings: Settings): Observable<Settings> {
    const url: string = `${this.masterDataURL}/settings`;
    return <Observable<Settings>> this.http.post(url, settings, httpOptions)
      .pipe(
        tap(settings => console.log(`Added restaurant settings`)),
        // catchError(this.handleError('addRestaurantSettings()', []))
      );
  }

  updateRestaurantSettings(settings: Settings): Observable<Settings> {
    const url: string = `${this.masterDataURL}/settings`;
    return <Observable<Settings>> this.http.put(url, settings, httpOptions)
      .pipe(
        tap(settings => console.log(`Updated restaurant settings`)),
        // catchError(this.handleError('updateRestaurantSettings()', []))
      );
  }

  getRestaurantSettings(): Observable<Settings> {
    const url: string = `${this.masterDataURL}/settings`;
    return <Observable<Settings>> this.http.get(url)
      .pipe(
        tap(settings => console.log(`Fetched restaurant settings`)),
        // catchError(this.handleError('getRestaurantSettings()', []))
      );
  }

  getRestaurantTables(): Observable<RestaurantTable[]>  {
    const url: string = `${this.masterDataURL}/tables`;
    return <Observable<RestaurantTable[]>> this.http.get(url)
      .pipe(
        tap(settings => console.log(`Fetched restaurant tables`)),
        // catchError(this.handleError('getRestaurantSettings()', []))
      );
  }

}
