import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ItemsComponent } from './items/items.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ClickItem } from './clickedItem/clicked.item';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ProductService } from './product.service';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { BuyPageComponent } from './buy-page/buy-page.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { CartBuyPageComponent } from './cart-buy-page/cart-buy-page.component';
import { AccountComponent } from './account/account.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ItemsComponent,
    HeaderComponent,
    FooterComponent,
    ClickItem,
    WishlistComponent,
    MyAccountComponent,
    CartComponent,
    CartItemComponent,
    BuyPageComponent,
    CartBuyPageComponent,
    CartBuyPageComponent,
    AccountComponent,
    AccountComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatIconModule,
    NgxPayPalModule,
  ],
  providers: [ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
