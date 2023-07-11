import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}
  haveAccount: boolean = true;
  loggedIn: boolean = false;
  oldUser: boolean = false;

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

  signup(fname: string, lname: string, passoword: string, email: string) {
    const userData = {
      firstName: fname,
      lastName: lname,
      password: passoword,
      email: email,
    };
    console.log(userData);

    this.http.post('/api/users/signup', userData).subscribe({
      next: (response) => {
        console.log('succes', response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  login(email: string, password: string) {
    console.log(email, password);
    this.http.post('api/users/login', { email, password }).subscribe({
      next: (data) => {
        console.log('logged succes');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log('something went wrong: ', error);
      },
    });
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

  showSignUp() {
    this.haveAccount = false;
  }

  showLogin() {
    this.haveAccount = true;
    this.loggedIn = false;
  }

  handleClick() {}
}
