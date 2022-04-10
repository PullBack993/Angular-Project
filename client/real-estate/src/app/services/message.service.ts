import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export interface IMessage { text: string, type: MessageType }

export enum MessageType {
  success,
  error
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageStorage$ = new Subject<IMessage>();
  
  onMessage$ = this.messageStorage$.asObservable()

  constructor() {}

  notifyForMessage(message: IMessage) {
    this.messageStorage$.next(message)
  }
}
