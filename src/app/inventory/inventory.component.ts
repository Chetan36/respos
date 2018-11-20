import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  receiveClicked(): void  {
    this.router.navigate(['/stock/RECEIVE']);
  }

  transferOutClicked(): void  {
    this.router.navigate(['/stock/TRANSFER']);
  }

  dumpClicked(): void  {
    this.router.navigate(['/stock/DUMP']);
  }

}
