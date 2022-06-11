import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header.component';
import { PagesModule } from 'src/app/pages/pages.module';
import { UserService } from 'src/app/services/user.service';
import { AuthGuard } from 'src/app/user/auth.guard';
import { UserModule } from 'src/app/user/user.module';
import { routes as mainRoutes } from 'src/app/app-routing.module';
import { mockUserData } from 'src/app/models/user.unittesting';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let location: Location;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes(mainRoutes), BrowserAnimationsModule],
      declarations: [],
      providers: [UserModule, PagesModule, AuthGuard],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    TestBed.inject(UserModule);
    TestBed.inject(PagesModule);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test structural directives if not user *ngIf', () => {
    const isUser: HTMLElement = fixture.debugElement.nativeElement.querySelector('#isUser');
    expect(isUser).toBeNull();
  });

  it('Should test isMobile', () => {
    expect(component.isMobile).toBeFalse();
  });

  it('Should test isMobile', () => {
    component.isMobile = true;

    fixture.detectChanges();

    expect(component.isMobile).toBeTrue();
  });

  it('Should test logout button ', () => {
    component.userIsAuthenticated = true;

    fixture.detectChanges();

    spyOn(component, 'onLogout').and.callThrough();
    const logoutBtn = fixture.debugElement.nativeElement.querySelector('#logout-btn');
    logoutBtn.click();
    expect(component.onLogout).toHaveBeenCalled();
  });

  describe('Test header routing paths', () => {
    function checkNavigate(cssSelector: String, navigationPath: String) {
      fixture.debugElement.nativeElement.querySelector(cssSelector).click();

      tick();

      expect(location.path()).toBe(navigationPath);
    }

    it('Should navigate to /new-projects', fakeAsync(() => {
      checkNavigate('#new-projects', '/new-projects');
    }));

    it('Should navigate to /properties', fakeAsync(() => {
      checkNavigate('#properties', '/properties');
    }));

    it('Should navigate to /retail-outlet', fakeAsync(() => {
      checkNavigate('#retail-outlet', '/retail-outlet');
    }));

    it('Should navigate to /create/ad', fakeAsync(() => {
      userService = TestBed.inject(UserService);
      spyOn(userService, 'getIsAuth').and.returnValue(true);

      checkNavigate('#create', '/create/ad');
    }));

    it('Should navigate to /calculator', fakeAsync(() => {
      checkNavigate('#calculator', '/calculator');
    }));

    it('Should navigate to /auth/profile', fakeAsync(() => {
      userService = TestBed.inject(UserService);
      spyOn(userService, 'getIsAuth').and.returnValue(true);
      component.userIsAuthenticated = true;

      fixture.detectChanges();

      checkNavigate('#isUser', '/auth/profile');
    }));

    it('Should navigate to /auth/login', fakeAsync(() => {
      checkNavigate('#login', '/auth/login');
    }));

    it('Should navigate to /auth/logout', fakeAsync(() => {
      component.userIsAuthenticated = true;

      fixture.detectChanges();

      checkNavigate('#logout-btn', '/');
    }));
  });

  describe('Test header in mobile mode', () => {
    it('should test string interpolation with user(and image)', () => {
      component.isMobile = true;
      component.userIsAuthenticated = true;
      component.currentUser = mockUserData;
      let compiled = fixture.debugElement.nativeElement;
      compiled.querySelector('#sidebar').click();

      fixture.detectChanges();

      expect(compiled.querySelector('#user-img').src).toContain(mockUserData.userData.imageUrl);
      expect(compiled.querySelector('.current-username').innerHTML).toContain(mockUserData.userData.username);
    });
  });
});
