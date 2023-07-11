import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClickItem } from './clickedItem/clicked.item';
import { ItemsComponent } from './items/items.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { BuyPageComponent } from './buy-page/buy-page.component';
import { CartBuyPageComponent } from './cart-buy-page/cart-buy-page.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: '', component: ItemsComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'account', component: AccountComponent },
  { path: 'product/:id', component: ClickItem },
  { path: 'buy/:id', component: BuyPageComponent },
  { path: 'cartbuy/cart', component: CartBuyPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
