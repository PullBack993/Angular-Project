import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { IUser } from '../models/user';
import { UserService } from './user.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { mockUserData } from '../models/user.unittesting';


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
    authService.getUser$().subscribe((data: IUser) => {
      expect(mockUserData).toBe(data);
    });
    //TODO change it 
    const req = httpController.expectOne(environment.apiUrl + '/editUser');
    expect(req.cancelled).toBeFalse();
    expect(req.request.responseType).toEqual('json');
    req.flush(mockUserData);
    httpController.verify();
    done();
  });

 
});
