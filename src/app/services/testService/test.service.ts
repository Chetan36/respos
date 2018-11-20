import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {SERVER_URL} from '../../Constants/ServerConstants';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  testURL: string = `${SERVER_URL}/demo`;

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

  testConnectivity(): Observable<boolean>  {
    const url: string = `${this.testURL}`;
    return <Observable<boolean>>this.http.get(url)
      .pipe(
        tap(testResult => console.log(`Connection tested`))
      );
  }

}
