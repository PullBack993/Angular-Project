import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild, OnChanges } from '@angular/core';
import { faEnvelope, faCaretDown, faCaretUp, faBars } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { MessageService, MessageType } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  icons = {
    faEnvelope,
    faCaretDown,
    faCaretUp,
    faBars
  };

  defaultImg: string = '../../../assets/images/profileImg.png';
  userIsAuthenticated: boolean = false;
  isMobile: boolean = false;

  errorMessage!: string;
  isErrorType!: boolean;
  messageSubs!: Subscription;
  screenSubs!: Subscription;
  authServiceSub!: Subscription;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  currentUser!: IUser;

  constructor(
    private authService: UserService,
    private messageService: MessageService,
    private observer: BreakpointObserver
  ) {}

  ngOnInit() {
    this.checkSideMenu();
    this.userIsAuthenticated = this.authService.getIsAuth();

    this.authServiceSub = this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.userIsAuthenticated = isAuthenticated;

      if (this.userIsAuthenticated) {
        this.authService.getUser$().subscribe((userData) => {
          this.currentUser = userData;
        });
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
  }
  //TODO check this method
  ngOnChanges(): void {
    if (this.userIsAuthenticated) {
      this.authService.getUser$().subscribe((userData) => {
        this.currentUser = userData;
      });
    }
  }
  private checkSideMenu(): void {
    this.screenSubs = this.observer.observe(['(max-width: 720px)']).subscribe((res) => {
      if (Object.values(res.breakpoints)[0] == true && this.sidenav != undefined) {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      }
    });
  }
  ngAfterViewInit(): void {
    this.checkSideMenu();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.screenSubs.unsubscribe();
    this.messageSubs.unsubscribe();
    this.authServiceSub.unsubscribe();
  }
}
