import { Injectable, OnInit } from '@angular/core';
import { Item } from './types/Item';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService implements OnInit {
  constructor(private http: HttpClient, private authService: AuthService) {}
  private wishlistItems: Item[] = [];
  wishlistId: number[] = [];

  ngOnInit(): void {
    // this.wishlistItems.forEach((el, id) => {
    //   if (!this.wishlistId.includes(el.id)) {
    //     this.wishlistId.push(el.id);
    //   }
    // });
  }

  getWishListId() {
    return this.wishlistId;
  }

  addToWishlist(item: Item) {
    if (!this.wishlistId.includes(item.id)) {
      item.isWished = true;
      this.wishlistItems.push(item);
      this.wishlistId.push(item.id);
    }
  }

  getWishlistItems() {
    return this.wishlistItems;
  }

  getwishListItemsFromDb() {
    this.http
      .get<any>('api/users/wishlistitems/' + this.authService.getUserId())
      .subscribe({
        next: (res) => {
          this.wishlistItems = res;
          this.wishlistItems.forEach((el, id) => {
            if (!this.wishlistId.includes(el.id)) {
              this.wishlistId.push(el.id);
            }
          });
          console.log(res);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  removeFromWishlist(item: Item) {
    const index = this.wishlistItems.findIndex((el) => el.id == item.id);
    if (index !== -1) {
      this.wishlistItems.splice(index, 1);
      this.wishlistId.splice(this.wishlistId.indexOf(item.id), 1);
    }
    console.log(index);
  }
}
