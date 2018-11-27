import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SERVER_URL} from '../../Constants/ServerConstants';
import {Observable, of} from 'rxjs';
import {PreOrder} from '../../Model/PreOrder';
import {catchError, map, tap} from 'rxjs/internal/operators';
import {OrderSettle} from '../../Model/OrderSettle';
import {Order} from '../../Model/Order';
import {OrderDetail} from '../../Model/OrderDetail';
import {SalesReport} from '../../Model/SalesReport';
import {ReportRequest} from '../../Model/ReportRequest';
import {ModifyOrder} from '../../Model/ModifyOrder';
import {OrderStart} from '../../model/OrderStart';
import {RestaurantTable} from '../../model/RestaurantTable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderURL = `${SERVER_URL}/order`;

  constructor(private http: HttpClient) {
  }

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

  getAllOrders(): Observable<Order[]> {
    const url = `${this.orderURL}/all`;
    return <Observable<Order[]>> this.http.get(url)
      .pipe(
        tap(orders => console.log(`Fetched all orders`)),
        // catchError(this.handleError('getAllOrders()', []))
      );
  }

  getOrderById(id: number): Observable<Order> {
    const url = `${this.orderURL}/id/${id}`;
    return <Observable<Order>> this.http.get(url)
      .pipe(
        tap(orders => console.log(`Fetched order by id`)),
        // catchError(this.handleError('getOrderById()', []))
      );
  }

  getOrderByTable(tableNumber: number): Observable<Order> {
    const url = `${this.orderURL}/table/${tableNumber}`;
    return <Observable<Order>> this.http.get(url)
      .pipe(
        tap(orders => console.log(`Fetched order by id`)),
        // catchError(this.handleError('getOrderById()', []))
      );
  }

  getOrderDetailsById(id: number): Observable<OrderDetail[]> {
    const url = `${this.orderURL}/id/${id}/details`;
    return <Observable<OrderDetail[]>> this.http.get(url)
      .pipe(
        tap(orders => console.log(`Fetched order details by id`)),
        // catchError(this.handleError('getOrderDetailsById()', []))
      );
  }

  placeDineInOrder(preOrder: PreOrder): Observable<Order> {
    const url = `${this.orderURL}/place/dineIn`;
    return <Observable<Order>> this.http.post(url, preOrder, httpOptions)
      .pipe(
        tap(status => console.log(`Placed Dine In Order`)),
        // catchError(this.handleError('placeDineInOrder()', []))
      );
  }

  placeTakeAwayOrder(preOrder: PreOrder): Observable<Order> {
    const url = `${this.orderURL}/place/takeAway`;
    return <Observable<Order>> this.http.post(url, preOrder, httpOptions)
      .pipe(
        tap(status => console.log(`Placed Take Away Order`)),
        // catchError(this.handleError('placeTakeAwayOrder()', []))
      );
  }

  placeHomeDeliveryOrder(preOrder: PreOrder): Observable<Order> {
    const url = `${this.orderURL}/place/homeDelivery`;
    return <Observable<Order>> this.http.post(url, preOrder, httpOptions)
      .pipe(
        tap(status => console.log(`Placed Home Delivery Order`)),
        // catchError(this.handleError('placeHomeDeliveryOrder()', []))
      );
  }

  modifyOrder(modifyOrder: ModifyOrder): Observable<OrderDetail[]> {
    const url = `${this.orderURL}/modify`;
    return <Observable<OrderDetail[]>> this.http.post(url, modifyOrder, httpOptions)
      .pipe(
        tap(status => console.log(`Modify order attempted`)),
        // catchError(this.handleError('modifyOrder()', []))
      );
  }

  settleByCash(orderSettle: OrderSettle): Observable<Order> {
    const url = `${this.orderURL}/settle/cash/${orderSettle.orderId}`;
    return <Observable<Order>> this.http.post(url, orderSettle, httpOptions)
      .pipe(
        tap(status => console.log(`Settle by cash attempted`)),
        // catchError(this.handleError('settleByCash()', []))
      );
  }

  settleByCard(orderSettle: OrderSettle): Observable<Order> {
    const url = `${this.orderURL}/settle/card/${orderSettle.orderId}`;
    return <Observable<Order>> this.http.post(url, orderSettle, httpOptions)
      .pipe(
        tap(status => console.log(`Settle by card attempted`)),
        // catchError(this.handleError('settleByCard()', []))
      );
  }

  initiateCancelOrder(orderId: number): Observable<Order[]> {
    const url = `${this.orderURL}/cancel/initiate/${orderId}`;
    return <Observable<Order[]>> this.http.put(url, httpOptions)
      .pipe(
        tap(order => console.log(`Cancel order attempted`)),
        // catchError(this.handleError('cancelOrder()', []))
      );
  }

  printKOT(orderId: number): Observable<boolean> {
    const url = `${this.orderURL}/print/kot/${orderId}`;
    return <Observable<boolean>> this.http.get(url)
      .pipe(
        tap(KOTprinted => console.log(`KOT print attempted`)),
        // catchError(this.handleError('printKOT()', []))
      );
  }

  printBill(orderId: number): Observable<boolean> {
    const url = `${this.orderURL}/print/bill/${orderId}`;
    return <Observable<boolean>> this.http.get(url)
      .pipe(
        tap(billPrinted => console.log(`Bill print attempted`)),
        // catchError(this.handleError('printBill()', []))
      );
  }

  fetchSalesReport(salesReportRequest: ReportRequest): Observable<SalesReport> {
    const url = `${this.orderURL}/report`;
    return <Observable<SalesReport>> this.http.post(url, salesReportRequest, httpOptions)
      .pipe(
        tap(salesReport => console.log(`Sales report fetch attempted`)),
        // catchError(this.handleError('fetchSalesReport()', []))
      );
  }

  printSalesReport(salesReport: SalesReport): Observable<boolean> {
    const url = `${this.orderURL}/report/print`;
    return <Observable<boolean>> this.http.post(url, salesReport, httpOptions)
      .pipe(
        tap(printed => console.log(`Sales report fetch attempted`)),
        // catchError(this.handleError('printSalesReport()', []))
      );
  }

}
