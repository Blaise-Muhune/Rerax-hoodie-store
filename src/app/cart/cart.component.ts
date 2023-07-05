import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Item } from '../types/Item';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}
  total: number = this.cartService.getTotalCartItems();
  nameItems: string[] = [];

  // items: Item[] = this.productService.getAllProducts();
  items: Item[] = this.cartService.getCartItems();

  // itemsUsedElementToRender: Item[] = [];

  ngOnInit(): void {
    // this.items.forEach((item) => {
    //   if (!this.nameItems.includes(item.name)) {
    //     this.nameItems.push(item.name);
    //     this.itemsUsedElementToRender.push(item);
    //   }
    // });
    // this.calculateTotal();
    this.total = this.cartService.getTotalCartItems();
  }

  calculateTotal(): void {}

  getUpdatedTotal(updatedTotal: number): void {
    this.total = updatedTotal;
    // this.total += updatedTotal;
  }

  // removeFromCart(item: Item): void {
  //   this.cartService.removeFromCart(item)
  //   this.calculateTotal();
  // }

  removeAll(): void {
    this.cartService.removeAll(this.items);
    this.items = [];
    this.total = 0;
  }
}
