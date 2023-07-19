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
import { RouteGuard } from 'src/app/route-guard';

const routes: Routes = [
  { path: 'cart', component: CartComponent, canActivate: [RouteGuard] },
  { path: '', component: ItemsComponent },
  { path: 'wishlist', component: WishlistComponent, canActivate: [RouteGuard] },
  { path: 'account', component: AccountComponent },
  { path: 'product/:id', component: ClickItem, canActivate: [RouteGuard] },
  { path: 'buy/:id', component: BuyPageComponent, canActivate: [RouteGuard] },
  {
    path: 'cartbuy/cart',
    component: CartBuyPageComponent,
    canActivate: [RouteGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteGuard],
})
export class AppRoutingModule {}
