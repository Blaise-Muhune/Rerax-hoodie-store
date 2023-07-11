import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartBuyPageComponent } from './cart-buy-page.component';

describe('CartBuyPageComponent', () => {
  let component: CartBuyPageComponent;
  let fixture: ComponentFixture<CartBuyPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartBuyPageComponent]
    });
    fixture = TestBed.createComponent(CartBuyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
