import { Component,  OnDestroy, OnInit } from '@angular/core';
import { faEnvelope, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import {  Subscription } from 'rxjs';
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
  private authListenerSubs!: Subscription;

  constructor(private authService: UserService) {}

  ngOnInit() {
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
  }
}
