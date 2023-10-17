import { HttpClient } from '@angular/common/http';
// import { expressionType } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginModel } from './types/LoginModel';
import { SignUpModel } from './types/SignupModel';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token!: string;
  private authenticatedSub = new Subject<boolean>();
  private isAuthenticated = false;
  private logoutTimer: any;
  private userID!: string;
  private user!: SignUpModel;

  getUserId() {
    return this.userID;
  }
  getUser() {
    return this.user;
  }
  getIsAuthenticated() {
    return this.isAuthenticated;
  }
  getAuthenticatedSub() {
    return this.authenticatedSub.asObservable();
  }
  getToken() {
    return this.token;
  }

  constructor(private http: HttpClient, private router: Router) {}

  signupUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    const authData: SignUpModel = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    this.http
      .post<{ message: string; userId: string; user: SignUpModel }>(
        '/api/users/signup',
        authData
      )
      .subscribe({
        next: (response) => {
          console.log('succes', response.message);
          // this.router.navigate(['/']);
          // this.loggedIn = true;
          // this.haveAccount = true;
          this.userID = response.userId;
          this.isAuthenticated = true;
          this.user = response.user;
          console.log(response.user);
        },
        error: (error) => {
          console.log('error', error);
        },
      });
  }

  loginUser(email: string, password: string) {
    const authData: LoginModel = { email: email, password: password };

    this.http
      .post<{
        token: string;
        expiresIn: number;
        userID: string;
        user: SignUpModel;
      }>('api/users/login', authData)
      .subscribe({
        next: (res) => {
          console.log('logged success');
          this.userID = res.userID;
          this.token = res.token;
          // console.log(res.token);
          this.user = res.user;
          console.log(res.user);
          // this.router.navigate(['/']);

          this.authenticatedSub.next(true);
          this.isAuthenticated = true;
          this.logoutTimer = setTimeout(() => {
            this.logout();
          }, res.expiresIn * 1000);
          const now = new Date();
          const expiresDate = new Date(now.getTime() + res.expiresIn * 1000);
          this.storeLoginDetails(this.token, expiresDate);
        },
        error: (error) => {
          console.log('something went wrong at login: ', error);
        },
      });
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authenticatedSub.next(false);
    this.router.navigate(['/']);
    clearTimeout(this.logoutTimer);
    this.clearLoginDetails();
    console.log('succes log out');
  }

  storeLoginDetails(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expirationDate.toISOString());
  }

  clearLoginDetails() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
  }

  getLocalStorageData() {
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');

    if (!token || !expiresIn) {
      return;
    }
    return {
      token: token,
      expiresIn: new Date(expiresIn),
    };
  }

  authenticateFromLocalStorage() {
    const localStorageData = this.getLocalStorageData();
    if (localStorageData) {
      const now = new Date();
      const expiresIn = localStorageData.expiresIn.getTime() - now.getTime();

      if (expiresIn > 0) {
        this.token = localStorageData.token;
        this.isAuthenticated = true;
        this.authenticatedSub.next(true);
        this.logoutTimer.setTimeout(expiresIn / 1000);
      }
    }
  }
}
