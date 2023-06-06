import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClickItem } from './cart/clicked.item';
import { ItemsComponent } from './items/items.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: '', component: ItemsComponent },
  { path: 'account', component: MyAccountComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'product/:id', component: ClickItem },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
