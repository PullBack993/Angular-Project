import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectsComponent } from './new-projects.component';

describe('NewProjectsComponent', () => {
  let component: NewProjectsComponent;
  let fixture: ComponentFixture<NewProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
