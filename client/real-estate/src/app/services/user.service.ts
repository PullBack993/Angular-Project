import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  login$(body: { email: string; password: string }) {
    return this.http.post('https://real-estate-angular-project.herokuapp.com/api/login', body);
  }
  register$(body: {username:string,email:string,password:string,repass:string}) {
    return this.http.post('https://real-estate-angular-project.herokuapp.com/api/register', body);
  }
}
