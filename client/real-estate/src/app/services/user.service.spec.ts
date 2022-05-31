import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { IUserDto, IUser } from '../models/user';
import { UserService } from './user.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';

const mockData: IUserDto = {
  token: '123',
  expiresIn: 30,
  userData: {
    email: 'asd@gmail.com',
    id: '123',
    isAdmin: false,
    isBroker: false,
    isNew: false,
    likedAd: [],
    username: 'asd'
  }
};

describe('UserService', () => {
  let authService: UserService;
  let httpController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule]
    });
    authService = TestBed.inject(UserService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('Should test getUser observable', (done) => {
    let mochUserData: IUser = {
      success: true,
      userData: {
        email: 'asd@gmail.com',
        imageUrl: 'http://asd',
        id: '1',
        isAdmin: false,
        isBroker: false,
        isNew: false,
        likedAd: [],
        username: 'ttt'
      }
    };
    authService.getUser$().subscribe((data: IUser) => {
      expect(mochUserData).toBe(data);
    });
    const req = httpController.expectOne(environment.apiUrl + '/editUser');
    expect(req.cancelled).toBeFalse();
    expect(req.request.responseType).toEqual('json');
    req.flush(mochUserData);
    httpController.verify();
    done();
  });

  it('Should test login method', (done) => {
    let a = authService.login({ email: "asd", password: '123' })
    console.log(a)
      done()
  });
});
