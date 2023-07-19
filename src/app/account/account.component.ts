import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  constructor(private http: HttpClient, private authService: AuthService) {}
  haveAccount: boolean = false;
  loggedIn: boolean = false;
  name: string = '';

  ngOnInit(): void {
    this.loggedIn = this.authService.getIsAuthenticated();
    console.log(this.loggedIn);
  }

  signup(fname: string, lname: string, passoword: string, email: string) {
    this.authService.signupUser(fname, lname, email, passoword);
    this.loggedIn = this.authService.getIsAuthenticated();
    console.log(this.loggedIn);
  }

  login(email: string, password: string) {
    this.authService.loginUser(email, password);
    this.loggedIn = this.authService.getIsAuthenticated();
    console.log(this.loggedIn);
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

  showSignUp() {
    this.haveAccount = !this.haveAccount;
  }

  showLogin() {
    this.haveAccount = !this.haveAccount;
  }

  handleClick() {}
}
