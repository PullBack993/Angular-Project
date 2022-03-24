import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdViewsComponent } from './ad-views.component';

describe('AdViewsComponent', () => {
  let component: AdViewsComponent;
  let fixture: ComponentFixture<AdViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdViewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
