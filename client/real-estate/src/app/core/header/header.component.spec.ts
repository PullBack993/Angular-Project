import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
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
    expect(component.isMobile).toBeTrue();
  });
 
});
