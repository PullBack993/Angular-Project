import { Component, OnDestroy, OnInit, OnChanges, ViewChild,  } from '@angular/core';
import { faEnvelope, faCaretDown, faCaretUp, faBars } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { MessageService, MessageType } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, OnChanges  {
  icons = {
    faEnvelope,
    faCaretDown,
    faCaretUp,
    faBars
  };

  isMobile!: boolean;
  userIsAuthenticated: boolean = false;
  showButtons: boolean = false;
  errorMessage!: string;
  isErrorType!: boolean;
  messageSubs!: Subscription;
  screenSubs!: Subscription;

  constructor(
    private authService: UserService,
    private messageService: MessageService,
    private observer: BreakpointObserver
  ) {}

  ngOnInit() {
    this.screenSubs = this.observer.observe(['(max-width: 720px)']).subscribe((res) => {
      if (res.matches) {
        console.log('true');
        this.isMobile = true;
      } else {
        this.isMobile = false;
        console.log('false');
      }
    });
    this.messageSubs = this.messageService.onMessage$.subscribe((newMessage) => {
      this.errorMessage = newMessage.text;
      this.isErrorType = newMessage.type === MessageType.error;
      if (this.errorMessage) {
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  ngOnChanges(): void {
    this.screenSubs = this.observer.observe(['(max-width: 720px)']).subscribe((res) => {
      if (res.matches) {
        console.log('true');
        this.isMobile = true;
      } else {
        this.isMobile = false;
        console.log('false');
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.screenSubs.unsubscribe();
    this.messageSubs.unsubscribe();
  }
}
