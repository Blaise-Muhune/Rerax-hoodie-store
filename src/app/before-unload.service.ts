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
}
