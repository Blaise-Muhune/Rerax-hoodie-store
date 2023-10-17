import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  NgModule,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { WishlistService } from '../wishlist.service';
import { Item } from '../types/Item';
import { __values } from 'tslib';
import { timeInterval } from 'rxjs';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
  @Input() item: Item = {} as Item;
  @Output() removeFromCart: EventEmitter<number> = new EventEmitter<number>();
  @Output() addRemoveOnchange: EventEmitter<number> =
    new EventEmitter<number>();

  @ViewChild('myQuantityInput', { static: true }) myInput!: ElementRef;

  tempTotal: number = this.cartService.getTotalCartItems();
  myInputChange!: number;
  inputChangeValues: number[] = [];
  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  async onInputChange(event: Event, itemFromSize: any, item: Item) {
    const input = event.target as HTMLInputElement;
    input.addEventListener('input', () => {
      let val = input.value;
      val = val.replace(/[+-]/g, '');
      input.value = val;
    });
    this.myInputChange = parseInt(input.value == '' ? '1' : input.value);
    // console.log(this.myInputChange);
    itemFromSize.numberIncart = await this.myInputChange;
    if (this.myInputChange == 0) {
      setTimeout(() => {
        this.cartService.removeFromCart(item, itemFromSize.label);
      }, 1500);
    }
    console.log(itemFromSize);

    this.addRemoveOnchange.emit(this.cartService.getTotalCartItems());
  }

  ngOnInit(): void {}
  handleClick() {
    console.log('holla');
  }

  handleRemove(sizeLabel: string) {
    // if (this.cartService.getCartItems().includes(this.item)) {
    // this.cartService.removeFromCart(this.item);
    // this.removeFromCart.emit(this.item);
    this.cartService.removeFromCart(this.item, sizeLabel);
    this.tempTotal = this.cartService.getTotalCartItems();
    this.removeFromCart.emit(this.tempTotal);
    // }
  }

  handleAddToWishlist() {
    this.item.isWished = !this.item.isWished;

    this.wishlistService.getWishlistItems().includes(this.item)
      ? this.wishlistService.removeFromWishlist(this.item)
      : this.wishlistService.addToWishlist(this.item);
  }
}
