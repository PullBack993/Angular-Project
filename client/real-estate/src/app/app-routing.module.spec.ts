import { Location } from '@angular/common';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';
import { UserModule } from './user/user.module';
import { PagesModule } from './pages/pages.module';

describe('Test app-routing (lazy loading) ', () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), PagesModule, UserModule],
      providers: [HttpClient, HttpHandler],
      declarations: []
    });
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('should test lazy loading ', fakeAsync(() => {
    routes.forEach((route) => {
        router.navigate([route.path]);

        tick();
        
      expect(route.loadChildren).not.toBeNull();
      expect(location.path()).toBe('/' + route.path);
    });
  }));
});
