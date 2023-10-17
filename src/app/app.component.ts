import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { BeforeUnloadService } from './before-unload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showNavbar: boolean = true;
  prevScrollPos: number = window.scrollY;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private cartService: CartService,
    private beforeUnload: BeforeUnloadService
  ) {}

  ngOnInit(): void {
    this.authService.authenticateFromLocalStorage();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    console.log('love');

    const currentScrollPos = window.scrollY;
    this.showNavbar = this.prevScrollPos > currentScrollPos;
    this.prevScrollPos = currentScrollPos;
  }
  // send to db on unload or refresh
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    if (event.type === 'beforeunload') {
      this.cartService.sendCurrentUpdate();

      console.log(event.type);
    }
    console.log(event.type);
    event.preventDefault();
  }
  title = 'my-app';
}
