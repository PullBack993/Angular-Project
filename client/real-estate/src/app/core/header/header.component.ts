import { Component, OnDestroy, OnInit } from '@angular/core';
import { faEnvelope, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { MessageService, MessageType } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
// @HostListener('mouseenter') onMouseLeave(event){
//   this.highlight('yellow')
// }
export class HeaderComponent implements OnInit, OnDestroy {
  icons = {
    faEnvelope,
    faCaretDown,
    faCaretUp
  };
  userIsAuthenticated: boolean = false;
  showButtons: boolean = false;
  errorMessage!: string;
  isErrorType!: boolean;

  private authListenerSubs!: Subscription;
  private messageSubs!: Subscription;


  constructor(private authService: UserService,private messageService: MessageService) {}

  ngOnInit() {
    this.messageSubs = this.messageService.onMessage$.subscribe(newMessage => {
      this.errorMessage = newMessage.text;
      this.isErrorType = newMessage.type === MessageType.error
      if (this.errorMessage) {
        setTimeout(() => {
          this.errorMessage = ''
        }, 3000);
      }

    })
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
    this.messageSubs.unsubscribe();
  }
 
}
