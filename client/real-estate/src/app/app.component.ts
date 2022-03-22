import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [trigger('blink', [state('void', style({ opacity: 0 })), transition('void <=> *', [animate('2s')])])]
})
export class AppComponent {
}
