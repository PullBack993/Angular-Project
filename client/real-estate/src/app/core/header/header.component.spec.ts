import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PagesModule } from 'src/app/pages/pages.module';
import { AppComponent } from 'src/app/app.component';
import { routes as pagesRoutes } from 'src/app/pages/app-pages-routing.module';
import { UserService } from 'src/app/services/user.service';
import { AuthGuard } from 'src/app/user/auth.guard';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let location: Location;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes(pagesRoutes),
        FontAwesomeModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        BrowserAnimationsModule
      ],
      declarations: [HeaderComponent],
      providers: [PagesModule, AppComponent, AuthGuard]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

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

   
  });
});
