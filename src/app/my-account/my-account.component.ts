import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent {
  constructor(private http: HttpClient) {}

  handleClick() {
    this.http.get('http://localhost:3000/hello').subscribe((data) => {
      // Handle the response data
      console.log(data);
    });
  }
}
