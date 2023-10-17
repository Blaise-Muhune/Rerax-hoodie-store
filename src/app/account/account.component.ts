import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { WishlistService } from '../wishlist.service';
import { SignUpModel } from '../types/SignupModel';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private cartservice: CartService,
    private wishlistService: WishlistService,
    private router: Router
  ) {}
  haveAccount: boolean = false;
  loggedIn: boolean = false;
  name: string = '';
  private user!: SignUpModel;

  ngOnInit(): void {
    this.loggedIn = this.authService.getIsAuthenticated();
    console.log(this.loggedIn);
    console.log(this.authService.getUserId());
  }

  signup(fname: string, lname: string, passoword: string, email: string) {
    this.authService.signupUser(fname, lname, email, passoword);
    this.loggedIn = this.authService.getIsAuthenticated();
    console.log(this.loggedIn);

    if (this.loggedIn) {
      this.cartservice.getCartItemsFromDatabase();
      this.wishlistService.getwishListItemsFromDb();
    }
  }

  async login(email: string, password: string) {
    await this.authService.loginUser(email, password);
    this.loggedIn = this.authService.getIsAuthenticated();

    console.log(this.loggedIn);

    if (this.loggedIn) {
      this.authService.authenticateFromLocalStorage();
      this.cartservice.getCartItemsFromDatabase();
      this.wishlistService.getwishListItemsFromDb();
      this.user = this.authService.getUser();
      this.name = this.user.firstName;
    }
    console.log(this.name);
  }
  getUserData() {
    this.http.get('api/content').subscribe({
      next: (data) => {
        console.log('response is: ', data);
      },
      error: (error) => {
        console.error('error is: ', error);
      },
    });
  }

  deleteAccount() {
    this.http
      .put('api/users/' + this.authService.getUserId(), {
        firstName: 'm',
        lastName: 'hn',
        email: 'blaisemu7@gmail.com',
        password: '111',
      })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.log('errorr: ', error);
        },
      });

    console.log(this.authService.getUserId());
  }

  logout() {
    this.authService.logout();
  }

  showSignUp() {
    this.haveAccount = !this.haveAccount;
  }

  showLogin() {
    this.haveAccount = !this.haveAccount;
  }

  handleClick() {}
}
