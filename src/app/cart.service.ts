import { Injectable } from '@angular/core';
import { Item } from './types/Item';
import { ItemsComponent } from './items/items.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  total: number = 0;

  private cartItems: Item[] = [];
  sizes: any[] = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

  constructor(private http: HttpClient, private authService: AuthService) {}
  addToCart(item: Item, sizeId: string) {
    let newSize = true;
    if (this.sizes.includes(sizeId)) {
      if (this.cartItems.includes(item)) {
        // console.log(sizeId);
        // console.log('true it includs');

        item.size.forEach((sizeItem, i) => {
          const sizeItemSize = sizeItem[0];
          const sizeItemValue = sizeItem[1];

          if (sizeItemSize === sizeId) {
            // console.log('true it equal');

            // Modify the number based on your requirements
            // For example, increment the value by 1
            sizeItem[1]++;
            this.total += item.price;
            const data = {
              updateWithThis: [sizeId, sizeItem[1], true],
              outerIndex: this.cartItems.indexOf(item),
              innerIndex: i,
            };

            // const data = {
            //   updateWithThis: [sizeId, sizeItem[1], true],
            //   outerIndex: item.id,
            //   innerIndex: sizeId,
            // };
            this.http
              .put(
                'api/users/updatesizecart/' + this.authService.getUserId(),
                data
              )
              .subscribe({
                next: (res) => {
                  console.log(res);
                },
                error: (error) => {
                  console.log(error);
                },
              });

            newSize = false;
          }
        });

        if (newSize) {
          const data = {
            updateWithThis: [sizeId, 1, true],
            outerIndex: this.cartItems.indexOf(item),
          };
          item.size.unshift([sizeId, 1, true]);
          this.http
            .put(
              'api/users/addFirstsizecart/' + this.authService.getUserId(),
              data
            )
            .subscribe({
              next: (res) => {
                console.log(res);
              },
              error: (error) => {
                console.log(error);
              },
            });
        }
      } else {
        console.log('no he dont');

        this.cartItems.unshift(item);
        item.size[0][0] = sizeId;
        item.size[0][1] = 1;
        this.total += item.price;

        this.http
          .put('api/users/' + this.authService.getUserId(), item)
          .subscribe({
            next: (res) => {
              console.log(res);
            },
            error: (error) => {
              console.log(error);
            },
          });
      }
      this.getTotalCartItems();
      this.calculateTotal;
    }
  }

  getCartItems() {
    this.http
      .get('api/users/cartitems/' + this.authService.getUserId())
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.log('error at get al items', error);
        },
      });
    return this.cartItems;
  }

  removeAll(items: Item[]) {
    this.cartItems = [];
    this.total = 0;
    // this.getTotalCartItems();
  }

  getTotalCartItems() {
    this.total = 0;
    this.cartItems.forEach((item) => {
      item.size.forEach((size) => {
        this.total += item.price * size[1];
      });
    });
    return this.total;
  }

  removeFromCart(item: Item, sizeLabel: string) {
    item.size.forEach((sizeItem, index) => {
      const sizeItemLabel = sizeItem[0];
      const sizeItemValue = sizeItem[1];
      console.log(index);

      if (sizeItemLabel === sizeLabel) {
        this.total -= item.price * sizeItemValue;
        if (index > -1) {
          console.log(index);

          console.log(item.size.length);

          item.size.splice(index, 1);
          if (item.size.length == 1) {
            this.cartItems.slice(this.cartItems.indexOf(item));
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

  private calculateTotal(): void {
    this.total = 0;
    this.cartItems.forEach((item) => {
      item.size.forEach((itemSize) => {
        itemSize[1] != -1 ? (this.total += item.price) : null;
      });
    });
  }
}
