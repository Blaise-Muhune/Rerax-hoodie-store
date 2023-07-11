import { Injectable } from '@angular/core';
import { Item } from './types/Item';
import { ItemsComponent } from './items/items.component';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  total: number = 0;

  private cartItems: Item[] = [];
  private cartBysizeArr: any[] = [];
  sizes: any[] = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
  addToCart(item: Item, sizeId: string) {
    let newSize = false;
    if (this.sizes.includes(sizeId)) {
      if (this.cartItems.includes(item)) {
        console.log(sizeId);
        console.log('true it includs');

        item.size.forEach((sizeItem) => {
          const sizeItemSize = sizeItem[0];
          const sizeItemValue = sizeItem[1];

          if (sizeItemSize === sizeId) {
            console.log('true it equal');

            // Modify the number based on your requirements
            // For example, increment the value by 1
            sizeItem[1]++;
            this.total += item.price;
            newSize = true;
          }
        });

        !newSize ? item.size.unshift([sizeId, 1, true]) : null;
      } else {
        console.log('no he dont');

        this.cartItems.unshift(item);
        item.size[0][0] = sizeId;
        item.size[0][1] = 1;
        this.total += item.price;
      }
      this.getTotalCartItems();
      this.calculateTotal;
    }
  }

  getCartItems() {
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
