import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokersFirmsComponent } from './brokers-firms.component';

describe('BrokersFirmsComponent', () => {
  let component: BrokersFirmsComponent;
  let fixture: ComponentFixture<BrokersFirmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokersFirmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokersFirmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
