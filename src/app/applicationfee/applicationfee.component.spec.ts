import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationfeeComponent } from './applicationfee.component';

describe('ApplicationfeeComponent', () => {
  let component: ApplicationfeeComponent;
  let fixture: ComponentFixture<ApplicationfeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationfeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationfeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
