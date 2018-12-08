import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SERVER_URL} from '../../Constants/ServerConstants';
import {Observable, of} from 'rxjs';
import {OrderStart} from '../../model/OrderStart';
import {tap} from 'rxjs/operators';
import {RestaurantTable} from '../../model/RestaurantTable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  restaurantURL = `${SERVER_URL}/restaurant`;

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  startOrder(tableNumber: number): Observable<OrderStart> {
    const url = `${this.restaurantURL}/table/start/${tableNumber}`;
    return <Observable<OrderStart>> this.http.get(url)
      .pipe(
        tap(orderStart => console.log(`Started order`)),
        // catchError(this.handleError('getOrderDetailsById()', []))
      );
  }

  freeTable(tableNumber: number): Observable<RestaurantTable> {
    const url = `${this.restaurantURL}/table/free/${tableNumber}`;
    return <Observable<RestaurantTable>> this.http.get(url)
      .pipe(
        tap(table => console.log(`Freed table`)),
        // catchError(this.handleError('getOrderDetailsById()', []))
      );
  }

  swapTable(fromTable: number, toTable: number): Observable<RestaurantTable>  {
    const url = `${this.restaurantURL}/table/swap/${fromTable}/${toTable}`;
    return <Observable<RestaurantTable>> this.http.get(url)
      .pipe(
        tap(table => console.log(`Swapped order table`)),
        // catchError(this.handleError('getOrderDetailsById()', []))
      );
  }

  cancelOrder(tableNumber: number): Observable<RestaurantTable> {
    const url = `${this.restaurantURL}/table/cancel/${tableNumber}`;
    return <Observable<RestaurantTable>> this.http.get(url)
      .pipe(
        tap(orderStart => console.log(`Started order`)),
        // catchError(this.handleError('getOrderDetailsById()', []))
      );
  }

  getRestaurantTables(): Observable<RestaurantTable[]>  {
    const url: string = `${this.restaurantURL}/tables`;
    return <Observable<RestaurantTable[]>> this.http.get(url)
      .pipe(
        tap(settings => console.log(`Fetched restaurant tables`)),
        // catchError(this.handleError('getRestaurantSettings()', []))
      );
  }

}
