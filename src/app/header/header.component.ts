import { Component, HostListener } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  showNavbar: boolean = true;
  prevScrollPos: number = window.pageYOffset;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollPos = window.pageYOffset;
    this.showNavbar = this.prevScrollPos > currentScrollPos;
    this.prevScrollPos = currentScrollPos;
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
