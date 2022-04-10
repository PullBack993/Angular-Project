import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService, MessageType } from '../services/message.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        this.messageService.notifyForMessage({
          text: err?.error?.message || 'Нещо се обърка опитайте онтово!',
          type: MessageType.error
        })
        return throwError(err);
      })
    );
  }
}
