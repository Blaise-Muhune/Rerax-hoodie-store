import { Component } from '@angular/core';
import { Item } from '../types/Item';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent {
  constructor(private productService: ProductService) {}
  items: Item[] = this.productService.getAllProducts();

  cart: string[] = [];

  ngOnInit(): void {}

  handleItemClick() {}
}
