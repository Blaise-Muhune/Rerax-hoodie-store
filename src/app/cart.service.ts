import { Injectable } from '@angular/core';
import { Item } from './types/Item';
import { ItemsComponent } from './items/items.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { WishlistService } from './wishlist.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  total: number = 0;
  idItemsInCart: any[] = [];

  private cartItems: Item[] = [];
  sizes: any[] = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private wishlistService: WishlistService
  ) {}

  addToCart(item: Item, sizeId: string) {
    console.log('added');

    let indexInludedItem = -1;

    this.cartItems.forEach((el, i) => {
      if (!this.idItemsInCart.includes(el.id)) {
        this.idItemsInCart.push(el.id);
      }
    });

    if (this.idItemsInCart.includes(item.id)) {
    }

    let newSize = true;
    if (this.sizes.includes(sizeId)) {
      if (this.idItemsInCart.includes(item.id)) {
        indexInludedItem = this.cartItems.findIndex((el) => el.id == item.id);
        item = this.cartItems[indexInludedItem];

        item.size.forEach((sizeItem, i) => {
          const sizeItemSize = sizeItem.label;
          const sizeItemValue = sizeItem.numberIncart;

          if (sizeItemSize === sizeId) {
            // Modify the number based on your requirements
            sizeItem.numberIncart++;
            this.total += item.price;

            newSize = false;
          }
        });

        if (newSize) {
          item.size.unshift({
            label: sizeId,
            numberIncart: 1,
          });
        }
      } else {
        console.log('no he dont');

        this.cartItems.unshift(item);
        item.size[0].label = sizeId;
        item.size[0].numberIncart = 1;
        this.total += item.price;
        this.idItemsInCart.push(item.id);
      }
      this.getTotalCartItems();
      this.calculateTotal;
    }
  }

  sendCurrentUpdate() {
    this.http
      .put('api/users/' + this.authService.getUserId(), {
        cart: this.getCartItems(),
        wishlist: this.wishlistService.getWishlistItems(),
      })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.log('error from beforeunloa: ', error);
        },
      });
  }

  getCartItems() {
    return this.cartItems;
  }

  getCartItemsFromDatabase() {
    this.http
      .get<Item[]>('api/users/cartitems/' + this.authService.getUserId())
      .subscribe({
        next: (res) => {
          console.log(res);
          this.cartItems = res;
        },
        error: (error) => {
          console.log('error at get al items', error);
        },
      });
  }

  removeFromCart(item: Item, sizeLabel: string) {
    item.size.forEach((sizeItem, index) => {
      const sizeItemLabel = sizeItem.label;
      const sizeItemValue = sizeItem.numberIncart;
      console.log(index);

      if (sizeItemLabel === sizeLabel) {
        this.total -= item.price * sizeItemValue;
        if (index > -1) {
          console.log(index);

          console.log(item.size.length);

          item.size.splice(index, 1);
          if (item.size.length == 1) {
            this.cartItems.slice(
              this.cartItems.findIndex((el) => el.id == item.id)
            );
          }
        } else {
          console.log('something went wrong in cart.service.ts');
        }
      }
    });
    // this.total -= item.price;
    // this.calculateTotal();
    // this.getTotalCartItems();
  }
  removeAll(items: Item[]) {
    this.cartItems = [];
    this.http
      .delete(
        'api/users/deleteallitemsfromcart/' + this.authService.getUserId()
      )
      .subscribe({
        next: (res) => {
          this.cartItems = [];
        },
        error: (error) => {
          console.log('error at delete Items: ');
        },
      });
    this.total = 0;
    // this.getTotalCartItems();
  }

  getTotalCartItems() {
    this.total = 0;
    this.cartItems.forEach((item) => {
      item.size.forEach((size) => {
        this.total += item.price * size.numberIncart;
      });
    });
    return this.total;
  }

  private calculateTotal(): void {
    this.total = 0;
    this.cartItems.forEach((item) => {
      item.size.forEach((itemSize) => {
        itemSize.numberIncart != -1 ? (this.total += item.price) : null;
      });
    });
  }
}
