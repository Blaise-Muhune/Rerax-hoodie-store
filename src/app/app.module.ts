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
import { ClickItem } from './cart/clicked.item';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ProductService } from './product.service';
import { CartComponent } from './cart/cart.component';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
