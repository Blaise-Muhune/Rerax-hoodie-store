import { HttpBackend, HttpClient } from '@angular/common/http';
import { HostListener, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { WishlistService } from './wishlist.service';

@Injectable({
  providedIn: 'root',
})
export class BeforeUnloadService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    if (event.type === 'beforeunload') {
      this.http
        .put('api/users/' + this.authService.getUserId(), {
          cart: this.cartService.getCartItems(),
          wishlist: this.wishlistService.getWishlistItems(),
        })
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (error) => {
            console.log('error from beforeunload: ', error);
          },
        });
      console.log(event.type);
    } else {
      console.log('else from beforeunlad');
    }
    event.preventDefault();
  }
}
