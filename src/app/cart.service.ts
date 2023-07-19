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
          const sizeItemSize = sizeItem.label;
          const sizeItemValue = sizeItem.numberIncart;

          if (sizeItemSize === sizeId) {
            // console.log('true it equal');

            // Modify the number based on your requirements
            // For example, increment the value by 1
            sizeItem.numberIncart++;
            this.total += item.price;
            // const data = {
            //   updateWithThis: [sizeId, sizeItem[1], true],
            //   outerIndex: this.cartItems.indexOf(item),
            //   innerIndex: i,
            // };

            const data = {
              updateWithThis: {
                label: sizeId,
                numberIncart: sizeItem.numberIncart,
              },
              outerId: item.id,
              innerId: sizeId,
            };
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
          item.size.unshift({ label: sizeId, numberIncart: 1 });
          const data = {
            updateWithThis: { label: sizeId, numberIncart: 1 },
            outerId: item.id,
          };
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
        item.size[0].label = sizeId;
        item.size[0].numberIncart = 1;
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
    return this.cartItems;
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
        itemSize.numberIncart != -1 ? (this.total += item.price) : null;
      });
    });
  }
}
