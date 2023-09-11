import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewfeestatusComponent } from './viewfeestatus.component';

describe('ViewfeestatusComponent', () => {
  let component: ViewfeestatusComponent;
  let fixture: ComponentFixture<ViewfeestatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewfeestatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewfeestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
