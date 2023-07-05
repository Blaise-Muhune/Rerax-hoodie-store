import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showNavbar: boolean = true;
  prevScrollPos: number = window.scrollY;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollPos = window.scrollY;
    this.showNavbar = this.prevScrollPos > currentScrollPos;
    this.prevScrollPos = currentScrollPos;
  }
  title = 'my-app';
}
