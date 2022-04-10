import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IUser, IUserDto } from '../models/user';
import { MessageService, MessageType } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userToken!: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated: boolean = false;
  private tokenTime!: any;

  constructor(private http: HttpClient, private route: Router,private messageService: MessageService) {}

  getToken() {
    return this.userToken;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  //for edit and delete method
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getUser$() {
    return this.http.get<IUser>('http://localhost:3000/api/editUser');
  }
  editUser(body: {}) {
    return this.http.put('http://localhost:3000/api/editUser', body);
  }
  register(body: { username: string; email: string; password: string; repass: string }) {
    this.http.post<IUserDto>('http://localhost:3000/api/register', body).subscribe({
      next: (res) => {
        this.setUser(res);
      },
      error: (err) => {
        this.authStatusListener.next(false);
      }
    });
  }

  login(body: { email: string; password: string }) {
    this.http.post<IUserDto>('http://localhost:3000/api/login', body).subscribe({
      next: (res) => {
        this.setUser(res);
      },
      error: (err) => {
        this.authStatusListener.next(false);
      }
    });
  }
  
  private setUser(res: IUserDto) {
    const token = res.token;
    this.userToken = token;
    if (token) {
      const expiresInDuration = res.expiresIn;
      this.setAuthTimer(expiresInDuration);
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      const timeNow = new Date();
      const expirationData = new Date(timeNow.getTime() + expiresInDuration * 1000);
      this.saveAuthData(token, expirationData);
      this.route.navigate(['']);
    }
    this.messageService.notifyForMessage({text: `Добре дошъл!` ,type: MessageType.success})
  }
  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.userToken = authInfo.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.userToken = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTime);
    this.clearAuthData();
    this.route.navigate(['']);
  }

  private setAuthTimer(duration: number) {
    console.log('create duration' + duration);
    this.tokenTime = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expData: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expData.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expDate = localStorage.getItem('expiration');
    if (!token || !expDate) {
      return;
    }
    return { token, expirationDate: new Date(expDate) };
  }
}
