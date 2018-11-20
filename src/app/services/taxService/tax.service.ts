import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SERVER_URL} from '../../Constants/ServerConstants';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/internal/operators';
import {Tax} from '../../Model/Tax';
import {Message} from '../../Model/Message';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  taxURL: string = `${SERVER_URL}/tax`;

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

  getAllTaxNames(): Observable<string[]> {
    const url: string = `${this.taxURL}/names`;
    return <Observable<string[]>>this.http.get(url)
      .pipe(
        tap(taxNames => console.log(`Fetched tax names`)),
        // catchError(this.handleError('getTaxNames()', []))
      );
  }

  getAllTaxes(): Observable<Tax[]>  {
    const url: string = `${this.taxURL}`;
    return <Observable<Tax[]>>this.http.get(url)
      .pipe(
        tap(taxes => console.log(`Fetched taxes`)),
        // catchError(this.handleError('getAllTaxes()', []))
      );
  }

  addNewTax(tax: Tax): Observable<Tax>  {
    const url: string = `${this.taxURL}`;
    return <Observable<Tax>>this.http.post(url, tax, httpOptions)
      .pipe(
        tap(tax => console.log(`Added new tax`)),
        // catchError(this.handleError('addNewTax()', []))
      );
  }

  updateTax(tax: Tax): Observable<Tax>  {
    const url: string = `${this.taxURL}`;
    return <Observable<Tax>>this.http.put(url, tax, httpOptions)
      .pipe(
        tap(tax => console.log(`Updated tax`)),
        // catchError(this.handleError('updateTax()', []))
      );
  }

  deleteTax(id: number): Observable<Message>  {
    const url: string = `${this.taxURL}/${id}`;
    return <Observable<Message>>this.http.delete(url)
      .pipe(
        tap(message => console.log(`Deleted tax`)),
        // catchError(this.handleError('deleteTax()', []))
      );
  }

}
