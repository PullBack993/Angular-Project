import { Component, OnInit, AfterViewInit, ViewChild, Input,OnChanges } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-asidenav',
  templateUrl: './asidenav.component.html',
  styleUrls: ['./asidenav.component.scss']
})
export class AsidenavComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() isAuth: boolean = false;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  showFiller: boolean = false;
  currentUser!: IUser;

  constructor(private observer: BreakpointObserver, private authService: UserService) {}

  ngOnInit(): void {
    if (this.isAuth) {
      this.authService.getUser$().subscribe((userData) => {
        this.currentUser = userData;
      });
    }
  }
  ngOnChanges(): void{
     if (this.isAuth) {
       this.authService.getUser$().subscribe((userData) => {
         this.currentUser = userData;
       });
     }
  }
  ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 720px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
  onLogout() {
    this.authService.logout();
  }
}
