import { Location } from '@angular/common';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-user-routing.module';
import { UserService } from '../services/user.service';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

describe('Test app user routing ', () => {
  let location: Location;
  let router: Router;
  let authService: UserService;

  function routingChecker(path: string) {
    router.navigate([path]);

    tick();

    expect(location.path()).toBe('/' + path);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [HttpClient, HttpHandler, AuthGuard],
      declarations: [RegisterComponent, LoginComponent, ProfileViewComponent]
    });
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('should test register routing ', fakeAsync(() => {
    routingChecker('register');
  }));

  it('should test login routing ', fakeAsync(() => {
    routingChecker('login');
  }));

  it('should test profile routinga ', fakeAsync(() => {
    authService = TestBed.inject(UserService);
    spyOn(authService, 'getIsAuth').and.returnValue(true);

    routingChecker('profile');
  }));
});
