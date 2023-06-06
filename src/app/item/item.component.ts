import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Item } from '../types/Item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() item: Item = {} as Item;

  isWished = false;
  constructor() {}

  ngOnInit(): void {}
  handleClick() {
    console.log('holla');
  }

  handleAddToWishlist() {
    this.isWished = !this.isWished;
  }

  handleNun(event: Event) {
    event.stopPropagation();
  }
}
