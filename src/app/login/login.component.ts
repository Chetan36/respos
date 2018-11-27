import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Staff} from '../model/Staff';
import {LoginCredentials} from '../model/LoginCredentials';
import {StaffService} from '../services/staffService/staff.service';
import {MasterDataService} from '../services/masterDataService/master-data.service';
import {ProfileService} from '../services/profileService/profile.service';
import {SettingsService} from '../services/settingsService/settings.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCredentials: LoginCredentials;
  staff: Staff;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private staffService: StaffService,
    private profileService: ProfileService,
    private settingsService: SettingsService
  ) { }

  openErrorSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  openSuccessSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  ngOnInit() {
    if (localStorage.getItem('Staff')) {
      this.router.navigate(['/kiosk']);
    }
    this.initLoginCredentials();
    this.initStaff();
  }

  initLoginCredentials(): void  {
    this.loginCredentials = {
      loginUsername: '',
      password: ''
    };
  }

  initStaff(): void {
    this.staff = {
      id: null,
      loginUsername: '',
      fullName: '',
      role: '',
      password: '',
      staffCode: ''
    };
  }

  loginUser(): void {
    if (this.loginCredentials.loginUsername === '' || this.loginCredentials.password === '')  {
      this.initLoginCredentials();
      this.openErrorSnackBar('Invalid credentials', 'Close');
      return;
    }
    this.staffService.authenticateStaff(this.loginCredentials)
      .subscribe(
        response => {
          if (response === null) {
            this.openErrorSnackBar('Invalid credentials', 'Close');
            this.initLoginCredentials();
            this.initStaff();
          } else {
            this.staff = response;
            console.log(this.staff);
            localStorage.setItem('Staff', JSON.stringify(this.staff));
            this.initStaff();
            this.getRestaurantDetails();
            this.getRestaurantSettings();
            this.router.navigate(['/kiosk']);
          }
        },
        error1 => {
          console.error(error1);
          this.openErrorSnackBar('Error logging in, please try after sometime', 'Close');
        }
      );
  }

  getRestaurantDetails(): void  {
    this.profileService.getRestaurantDetails()
      .subscribe(
        response => {
          localStorage.setItem('Restaurant', JSON.stringify(response));
        },
        error1 => {
          console.error(error1);
          localStorage.setItem('Restaurant', null);
        }
      );
  }

  getRestaurantSettings(): void  {
    this.settingsService.getRestaurantSettings()
      .subscribe(
        response => {
          localStorage.setItem('Settings', JSON.stringify(response));
          console.log(localStorage.getItem('Settings'));
        },
        error1 => {
          console.error(error1);
          localStorage.setItem('Settings', null);
        }
      );
  }

}
