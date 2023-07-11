import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
    // this.http.post('/api/users/', { firstName: 'blaise' }).subscribe({
    //   next: (data) => {
    //     console.log('response is: ', data);
    //   },
    //   error: (error) => {
    //     console.error('error is: ', error);
    //   },
    // });
    // this.http.get('/api/users/').subscribe({
    //   next: (data) => {
    //     console.log('response is: ', data);
    //   },
    //   error: (error) => {
    //     console.error('error is: ', error);
    //   },
    // });
  }

  navigateToAccount() {
    console.log('runned');

    this.router.navigate(['/account']);
  }
}
