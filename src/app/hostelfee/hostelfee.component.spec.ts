import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelfeeComponent } from './hostelfee.component';

describe('HostelfeeComponent', () => {
  let component: HostelfeeComponent;
  let fixture: ComponentFixture<HostelfeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelfeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelfeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
