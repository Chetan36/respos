import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SERVER_URL} from '../../Constants/ServerConstants';
import {Observable, of} from 'rxjs';
import {RestaurantDetails} from '../../model/RestaurantDetails';
import {tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profileURL: string = `${SERVER_URL}/settings`;

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

  getRestaurantDetails(): Observable<RestaurantDetails> {
    const url: string = `${this.profileURL}`;
    return <Observable<RestaurantDetails>> this.http.get(url)
      .pipe(
        tap(restaurantDetails => console.log(`Fetched restaurant details`)),
        // catchError(this.handleError('getRestaurantDetails()', []))
      );
  }

  addRestaurantDetails(restaurantDetails: RestaurantDetails): Observable<RestaurantDetails> {
    const url: string = `${this.profileURL}`;
    return <Observable<RestaurantDetails>> this.http.post(url, restaurantDetails, httpOptions)
      .pipe(
        tap(restaurantDetails => console.log(`Added restaurant details`)),
        // catchError(this.handleError('addRestaurantDetails()', []))
      );
  }

  updateRestaurantDetails(restaurantDetails: RestaurantDetails): Observable<RestaurantDetails> {
    const url: string = `${this.profileURL}`;
    return <Observable<RestaurantDetails>> this.http.put(url, restaurantDetails, httpOptions)
      .pipe(
        tap(restaurantDetails => console.log(`Updated restaurant details`)),
        // catchError(this.handleError('updateRestaurantDetails()', []))
      );
  }

}
