import { Component, OnInit } from '@angular/core';
import { Item } from '../types/Item';
import { ProductService } from '../product.service';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private wishlistService: WishlistService
  ) {}
  items: Item[] = [];

  cart: string[] = [];

  ngOnInit() {
    this.items = this.productService.getAllProducts();
    this.items = this.items.map((item) => {
      if (this.wishlistService.getWishListId().includes(item.id)) {
        item.isWished = true;
      } else {
        item.isWished = false;
      }
      return item;
    });
  }

  handleItemClick() {}
}
