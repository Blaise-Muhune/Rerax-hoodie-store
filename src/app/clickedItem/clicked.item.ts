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

import { ActivatedRoute, Router } from '@angular/router';
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
    private cartService: CartService,
    private router: Router
  ) {}
  itemId: number = 0;
  isSizeIdIncluded: boolean = false;
  sizeIndex: number = -1;
  currentIndex: number = 0;
  displayNumber: boolean = false;
  sizeLabel: string = '';
  clickedActiveSize: string = ''; //DEFAULT SELECTION
  itemFromSize: any = { label: '', numberIncart: 0 };
  myInputChange!: number;
  added: boolean = false;

  sizes: any[] = [];

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.itemId = +params['id'];
      this.item = this.productService.getProductById(this.itemId);
    });
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
    console.log(this.sizes[0].includeThisSize);
  }

  onItemClick(item: Item, howMany: Number, clickedActiveSize: string): void {
    if (clickedActiveSize == '') {
      alert('Must choose size first !');
    }
    this.router.navigate(['/buy', this.item.id], {
      state: { item, howMany, clickedActiveSize },
    });
  }

  scrollToElement(element: ElementRef) {
    element.nativeElement.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
    });
  }

  clickedSizeLabelFunc(size: boolean): boolean {
    return size;
  }

  getVisibilityOfItemNumber() {
    if (this.clickedActiveSize == '') {
    }
  }

  handleAddToCart(sizeId: string) {
    this.cartService.addToCart(this.item, sizeId);
    this.added = !this.added;
    for (const size of this.item.size) {
      if (size.label == sizeId) {
        this.itemFromSize.label = size.label;
        this.itemFromSize.numberIncart = size.numberIncart;
        break;
      }
    }
    let bool = false;
    for (let size of this.item.size) {
      if (sizeId == size.label && size.numberIncart > 0) {
        bool = true;
      }
    }
    this.displayNumber = this.clickedActiveSize != '' && bool;
  }

  getSelectedSize(sizeLabel: string, includeThisSize: boolean) {
    this.sizeLabel = includeThisSize ? sizeLabel : '';
    this.clickedActiveSize = sizeLabel;
    this.itemFromSize = ['', 0, false];
    for (const size of this.item.size) {
      if (size.label == this.clickedActiveSize) {
        this.itemFromSize.label = size.label;
        this.itemFromSize.numberIncart = size.numberIncart;
        // this.itemFromSize[2] = size[2];
        break;
      }
    }
    if (this.itemFromSize.label != '') {
      for (const size of this.item.size) {
        if (size.label == this.clickedActiveSize) {
          // size[2] = true;
          break;
        }
      }
      this.displayNumber = true;
    } else {
      this.displayNumber = false;
    }
  }

  getNumberItemFunc(clickedActiveSize: string) {
    for (const size of this.item.size) {
      if (size.label == clickedActiveSize) {
        this.itemFromSize.label = size.label;
        this.itemFromSize.numberIncart = size.numberIncart;
        break;
      }
    }
  }

  async onInputChange(event: Event, item: Item, clickedActiveSize: string) {
    if (this.clickedActiveSize != '') {
      for (const size of item.size) {
        if (size.label == '') {
          size.label = clickedActiveSize;
        }
        console.log(clickedActiveSize);
        if (size.label == clickedActiveSize) {
          console.log(clickedActiveSize);
          this.itemFromSize.label = clickedActiveSize;
          this.itemFromSize.numberIncart = size.numberIncart;
          break;
        }
      }
      const input = event.target as HTMLInputElement;
      input.addEventListener('input', () => {
        let val = input.value;
        val = val.replace(/[+-]/g, '');
        input.value = val;
      });
      this.myInputChange = parseInt(input.value);
      // console.log(this.myInputChange);
      this.itemFromSize.numberIncart = await this.myInputChange;

      for (const size of this.item.size) {
        if (size.label == clickedActiveSize) {
          size.label = clickedActiveSize;
          size.numberIncart = this.itemFromSize.numberIncart;
          break;
        }
        console.log(this.itemFromSize);
      }
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////

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
