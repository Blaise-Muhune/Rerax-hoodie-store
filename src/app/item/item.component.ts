import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  sizes: any[] = [];
  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private router: Router
  ) {}

  onItemClick(item: Item): void {
    this.router.navigate(['/buy', this.item.id], { state: { item } });
  }

  handleClick() {
    console.log('holla');
  }
  ngOnInit(): void {
    this.sizes = [
      {
        nameSize: 'XS',
        includeThisSize: this.item.xs,
      },
      {
        nameSize: 'S',
        includeThisSize: this.item.s,
      },
      {
        nameSize: 'M',
        includeThisSize: this.item.m,
      },

      {
        nameSize: 'L',
        includeThisSize: this.item.l,
      },

      {
        nameSize: 'XL',
        includeThisSize: this.item.xl,
      },

      {
        nameSize: '2XL',
        includeThisSize: this.item.xxl,
      },
    ];
  }

  handleAddToCart(sizeId: string) {
    this.cartService.addToCart(this.item, sizeId);
  }

  handleAddToWishlist() {
    this.item.isWished = !this.item.isWished;

    if (this.wishlistService.getWishListId().includes(this.item.id)) {
      this.wishlistService.removeFromWishlist(this.item);
    } else {
      this.wishlistService.addToWishlist(this.item);
    }
  }

  showSizeContainer() {
    this.isSizeContainerHidden = !this.isSizeContainerHidden;
  }
}
