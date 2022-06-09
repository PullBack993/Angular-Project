import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FontAwesomeModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        BrowserAnimationsModule
      ],
      declarations: [HeaderComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test if not user *ngIf', () => {
    const isUser: HTMLElement = fixture.debugElement.nativeElement.querySelector('#isUser');
    const isNotUser: HTMLElement = fixture.debugElement.nativeElement.querySelector('#isNotUser');
    expect(isNotUser).not.toBeNull();
    expect(isUser).toBeNull();
  });

  it('Should test isMobile', () => {
    expect(component.isMobile).toBeFalse();
  });

  it('Should test isMobile', () => {
    component.isMobile = true;

    fixture.detectChanges();

    expect(component.isMobile).toBeTrue();
  });

  it('Should test logout button ', () => {
    const logoutBtn = fixture.debugElement.nativeElement.querySelector('#logout-btn');
    component.userIsAuthenticated = true;
    spyOn(component, 'onLogout').and.callThrough();

    fixture.detectChanges();

    logoutBtn.click();
    expect(component.onLogout).toHaveBeenCalled();
  });
});
