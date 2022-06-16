import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [trigger('blink', [state('void', style({ opacity: 0 })), transition('void <=> *', [animate('1s')])])]
})
export class AppComponent implements OnInit {

  constructor(private authService: UserService){}

  ngOnInit(): void {
     this.authService.autoAuthUser()
  }
}
