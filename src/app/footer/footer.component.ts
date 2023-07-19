import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(private cartService: CartService) {}
  ngOnInit(): void {}

  homeClick() {
    this.cartService.getCartItems();
  }
}
