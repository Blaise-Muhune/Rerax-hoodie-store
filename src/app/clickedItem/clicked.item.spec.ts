import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickItem } from './clicked.item';

describe('ClickItem', () => {
  let component: ClickItem;
  let fixture: ComponentFixture<ClickItem>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClickItem],
    });
    fixture = TestBed.createComponent(ClickItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
