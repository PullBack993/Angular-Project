import { TestBed  } from '@angular/core/testing';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../services/user.service';
import { throwError } from 'rxjs';

describe('ErrorHandlerInterceptor', () => {
  let interceptor: ErrorHandlerInterceptor;

  let httpRequestSpy;
  let HttpHandlerSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ErrorHandlerInterceptor, UserService]
    });
    interceptor = TestBed.inject(ErrorHandlerInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should catch server error', () => {
    httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['get']);
    HttpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    HttpHandlerSpy.handle.and.returnValue(throwError(() => new Error('test-error')));

    interceptor.intercept(httpRequestSpy, HttpHandlerSpy).subscribe({
      next: (result) => console.log(result),
      error: (err) => expect(err.toString()).toBe('Error: test-error')
    });
  });
});
