import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailOutletComponent } from './retail-outlet.component';

describe('RetailOutletComponent', () => {
  let component: RetailOutletComponent;
  let fixture: ComponentFixture<RetailOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailOutletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
