import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit {
  constructor(private _WishlistService: WishlistService, private _Router: Router, private _CartService: CartService) { }
  // scroll navbar
  navbarScroll: boolean = false;
  @HostListener('window:scroll')
  onScroll(): void{
    this.navbarScroll = true;
  if (window.scrollY< 80) {
    this.navbarScroll = false;
  }
  }
//
  cartNumberNav: number=0;
  wishListNumberNav: number=0;
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
    this._WishlistService.wishlistNumber.subscribe({
      next: (number) => {
        this.wishListNumberNav=number
      }
    })
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishListNumberNav=res.count
      }
    })
  }
  logo: string = "./assets/imgs/freshcart-logo.svg"
  signOut(): void{
    localStorage.removeItem('utoken');
    this._Router.navigate(['/signin'])
  }
}
