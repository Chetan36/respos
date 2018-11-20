import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Staff} from '../../Model/Staff';
import {SERVER_URL} from '../../Constants/ServerConstants';
import {catchError, map, tap} from 'rxjs/internal/operators';
import {Message} from '../../Model/Message';
import {Role} from '../../Model/Role';
import {LoginCredentials} from '../../Model/LoginCredentials';
import {ChangePassword} from '../../Model/ChangePassword';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  staffURL = `${SERVER_URL}/staff`;

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

  getAllStaff(): Observable<Staff[]>  {
    const url = `${this.staffURL}/all`;
    return <Observable<Staff[]>> this.http.get(url)
      .pipe(
        tap(staff => console.log(`Fetched staff`)),
        // catchError(this.handleError('getAllStaff()', []))
      );
  }

  authenticateStaff(loginCredentials: LoginCredentials): Observable<any>  {
    const url = `${this.staffURL}/authenticate`;
    console.log(url);
    return <Observable<any>> this.http.post(url, loginCredentials, httpOptions)
      .pipe(
        tap(roles => console.log(`Attempted authentication`)),
        // catchError(this.handleError('authenticateStaff()', []))
      );
  }

  getStaffNames(): Observable<string[]> {
    const url = `${this.staffURL}/names`;
    return <Observable<string[]>> this.http.get(url)
      .pipe(
        tap(staff => console.log(`Fetched staff`)),
        // catchError(this.handleError('getStaffNames()', []))
      );
  }

  addClerk(staff: Staff): Observable<Staff> {
    const url = `${this.staffURL}/clerk`;
    return <Observable<Staff>> this.http.post(url, staff, httpOptions)
      .pipe(
        tap(staff => console.log(`Posted staff`)),
        // catchError(this.handleError('addStaff()', []))
      );
  }

  addWaiter(staff: Staff): Observable<Staff> {
    const url = `${this.staffURL}/waiter`;
    return <Observable<Staff>> this.http.post(url, staff, httpOptions)
      .pipe(
        tap(staff => console.log(`Posted staff`)),
        // catchError(this.handleError('addStaff()', []))
      );
  }

  addDeliveryAgent(staff: Staff): Observable<Staff> {
    const url = `${this.staffURL}/delivery`;
    return <Observable<Staff>> this.http.post(url, staff, httpOptions)
      .pipe(
        tap(staff => console.log(`Posted staff`)),
        // catchError(this.handleError('addStaff()', []))
      );
  }

  updateStaff(staff: Staff): Observable<Staff> {
    const url = `${this.staffURL}`;
    return <Observable<Staff>> this.http.put(url, staff, httpOptions)
      .pipe(
        tap(staff => console.log(`Updated staff`)),
        // catchError(this.handleError('updateStaff()', []))
      );
  }

  changePassword(changePassword: ChangePassword): Observable<boolean> {
    const url = `${this.staffURL}/password`;
    return <Observable<boolean>> this.http.put(url, changePassword, httpOptions)
      .pipe(
        tap(changed => console.log(`Changed staff password`)),
        // catchError(this.handleError('changePassword()', []))
      );
  }

  deleteStaff(id: number): Observable<Message>  {
    const url = `${this.staffURL}/${id}`;
    return <Observable<Message>> this.http.delete(url)
      .pipe(
        tap(staff => console.log(`Deleted staff`)),
        // catchError(this.handleError('updateStaff()', []))
      );
  }

}
