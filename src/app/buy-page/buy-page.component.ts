import { Component, Input, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Item } from '../types/Item';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart-buy-page',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.css'],
})
export class BuyPageComponent implements OnInit {
  @Input() item: Item = {} as Item;
  howMany: number = 1;
  total: number = 0;
  size: string = '';
  public payPalConfig?: IPayPalConfig;

  showSuccess: boolean = false;
  showCancel: boolean = false;
  showError: boolean = false;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initConfig();
    this.item = history.state.item;
    this.howMany = history.state.howMany == 0 ? 1 : history.state.howMany;
    this.total = this.item.price * this.howMany;

    this.size = history.state.clickedActiveSize;
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
