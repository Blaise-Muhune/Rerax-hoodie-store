import { Component } from '@angular/core';
import { Item } from '../types/Item';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  constructor(private wishlistService: WishlistService) {}

  items: Item[] = this.wishlistService.getWishlistItems();
}
