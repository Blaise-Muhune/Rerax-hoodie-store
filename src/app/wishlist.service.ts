import { Injectable } from '@angular/core';
import { Item } from './types/Item';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistItems: Item[] = [];

  addToWishlist(item: Item) {
    this.wishlistItems.push(item);
  }

  getWishlistItems() {
    return this.wishlistItems;
  }

  removeFromWishlist(item: Item) {
    const index = this.wishlistItems.indexOf(item);
    if (index !== -1) {
      this.wishlistItems.splice(index, 1);
    }
  }
}
