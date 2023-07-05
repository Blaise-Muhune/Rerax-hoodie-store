import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { WishlistService } from '../wishlist.service';
import { Item } from '../types/Item';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() item: Item = {} as Item;

  isSizeContainerHidden: boolean = true;
  isSizeIdIncluded: boolean = false;
  sizeIndexToBeSent: number = 0;
  sizeIndex: number = -1;

  sizes: any[] = [
    {
      nameSize: 'XS',
      howMany: 0,
    },
    {
      nameSize: 'S',
      howMany: 0,
    },
    {
      nameSize: 'M',
      howMany: 0,
    },

    {
      nameSize: 'L',
      howMany: 0,
    },

    {
      nameSize: 'XL',
      howMany: 0,
    },

    {
      nameSize: '2XL',
      howMany: 0,
    },
  ];
  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}
  handleClick() {
    // console.log('holla');
  }

  handleAddToCart(sizeId: string) {
    this.cartService.addToCart(this.item, sizeId);

    // this.item.size[0] = sizeId;
    // console.log(sizeId);
    // if (
    /* [0: 'label', 1:'number item'] */
    //   !this.cartService.getCartBySizeValue().includes(this.item.size[0])
    // ) {
    //   this.cartService.getCartBySize();
    // console.log(this.item.size[0]);
    // have to change back the '==1' to 0
    //   this.cartService.addToCart(this.item);
    //   this.item.size[1]++;
    // console.log(this.cartService.getCartBySizeValue());
    // } else if (
    //   this.cartService.getCartBySizeValue().includes(this.item.size[0])
    // ) {
    //   this.cartService.getCartBySize();
    // this.cartService.removeFromCart(this.item);
    // this.item.size[1]++;
    // console.log(this.item.size[0]);
    // console.log(this.cartService.getCartBySize());
    // }
  }

  handleAddToWishlist() {
    this.item.isWished = !this.item.isWished;

    this.wishlistService.getWishlistItems().includes(this.item)
      ? this.wishlistService.removeFromWishlist(this.item)
      : this.wishlistService.addToWishlist(this.item);
  }

  showSizeContainer() {
    this.isSizeContainerHidden = !this.isSizeContainerHidden;
  }
}
