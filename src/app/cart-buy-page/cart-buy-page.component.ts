import { Component, Input, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Item } from '../types/Item';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-buy-page',
  templateUrl: './cart-buy-page.component.html',
  styleUrls: ['./cart-buy-page.component.css'],
})
export class CartBuyPageComponent implements OnInit {
  items: Item[] = this.cartService.getCartItems();
  // items: Item[] = [];
  total: number = this.cartService.getTotalCartItems();

  ///////////////////////////////////////////
  public payPalConfig?: IPayPalConfig;

  showSuccess: boolean = false;
  showCancel: boolean = false;
  showError: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.total = this.cartService.getTotalCartItems();
    // for (let item of this.cartService.getCartItems()) {
    //   for (let element of item.size) {
    //     this.items.push(element);
    //   }
    // }

    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: '9.99',
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: '9.99',
                  },
                },
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'EUR',
                    value: '9.99',
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.showCancel = true;
      },
      onError: (err) => {
        console.log('OnError', err);
        this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        // this.resetStatus();
      },
    };
  }
}
