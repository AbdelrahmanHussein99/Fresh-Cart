import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit {
  constructor(private _Router: Router,private _CartService:CartService) { }
  cartNumberNav: number=0;
  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next: (number) => {
        this.cartNumberNav=number
        console.log(number);
      }
    })
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.cartNumberNav = res.numOfCartItems;
      }
    })
  }
  logo: string = "./assets/imgs/freshcart-logo.svg"
  signOut(): void{
    localStorage.removeItem('utoken');
    this._Router.navigate(['/signin'])
  }
}
