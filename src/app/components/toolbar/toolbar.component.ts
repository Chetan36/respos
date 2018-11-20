import { Component, OnInit } from '@angular/core';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  logoutUser(): void  {
    this.logoutConfirmation();
  }

  logoutConfirmation() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '150px',
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }

}
