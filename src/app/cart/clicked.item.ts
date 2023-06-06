import {
  Component,
  ElementRef,
  ViewChild,
  QueryList,
  ViewChildren,
  AfterViewInit,
  OnInit,
  Input,
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Item } from '../types/Item';
@Component({
  selector: 'app-cart',
  templateUrl: './clicked.item.html',
  styleUrls: ['./clicked.item.css'],
})
export class ClickItem implements OnInit {
  @Input() item: Item = {} as Item;
  itemId: number = 0;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.itemId = +params['id'];
      this.item = this.productService.getProductById(this.itemId);
    });
  }

  @ViewChildren('scrollElement') scrollElements!: QueryList<ElementRef>;

  currentIndex: number = 0;

  scrollToElement(element: ElementRef) {
    element.nativeElement.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
    });
  }

  scrollToNextElement() {
    if (this.scrollElements.length === 0) {
      return; // No elements to scroll
    }

    const nextIndex = (this.currentIndex + 1) % this.scrollElements.length;
    const nextElement = this.scrollElements.toArray()[nextIndex];
    this.scrollToElement(nextElement);

    this.currentIndex = nextIndex;
  }

  scrollToPreviousElement() {
    if (this.scrollElements.length === 0) {
      return; // No elements to scroll
    }

    const previousIndex =
      (this.currentIndex - 1 + this.scrollElements.length) %
      this.scrollElements.length;
    const previousElement = this.scrollElements.toArray()[previousIndex];
    this.scrollToElement(previousElement);

    this.currentIndex = previousIndex;
  }

  counter: number = 1;

  incrementCounter() {
    this.counter++;
  }

  decrementCounter() {
    if (this.counter > 1) {
      this.counter--;
    }
  }
}
