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
import { CartService } from '../cart.service';
import { Item } from '../types/Item';
@Component({
  selector: 'app-clicked-cart',
  templateUrl: './clicked.item.html',
  styleUrls: ['./clicked.item.css'],
})
export class ClickItem implements OnInit {
  @Input() item: Item = {} as Item;
  @ViewChildren('scrollElement') scrollElements!: QueryList<ElementRef>;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}
  itemId: number = 0;
  isSizeIdIncluded: boolean = false;
  sizeIndex: number = -1;
  currentIndex: number = 0;
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

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.itemId = +params['id'];
      this.item = this.productService.getProductById(this.itemId);
    });
  }

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

  handleAddToCart(sizeId: string) {
    this.cartService.addToCart(this.item, sizeId);
    // for (let i = 0; i < this.item.size.length; i++) {
    //   if (this.item.size[i].includes(sizeId)) {
    //     this.isSizeIdIncluded = true;
    //     this.sizeIndex = i;
    //   }
    // }
    // if (this.isSizeIdIncluded == true) {
    //   this.item.size[this.sizeIndex][1]++;
    // } else {
    //   this.cartService.addToCart(this.item);
    //   this.item.size[this.item.size.length - 1][1]++;
    // }
    // this.item.size[0] = sizeId;
    // console.log(sizeId);
    // if (
    /* [0: 'label', 1:'number item'] */
    //   !this.cartService.getCartBySizeValue().includes(this.item.size[0])
    // ) {
    //   this.cartService.getCartBySize();
    //   console.log(this.item.size[0]);
    // have to change back the '==1' to 0
    //   this.cartService.addToCart(this.item);
    //   this.item.size[1]++;
    //   console.log(this.cartService.getCartBySizeValue());
    // } else if (
    //   this.cartService.getCartBySizeValue().includes(this.item.size[0])
    // ) {
    //   this.cartService.getCartBySize();
    // this.cartService.removeFromCart(this.item);
    // this.item.size[1]++;
    //   console.log(this.item.size[0]);
    //   console.log(this.cartService.getCartBySize());
    // }
  }
}
