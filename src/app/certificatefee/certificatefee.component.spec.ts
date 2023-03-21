import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatefeeComponent } from './certificatefee.component';

describe('CertificatefeeComponent', () => {
  let component: CertificatefeeComponent;
  let fixture: ComponentFixture<CertificatefeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificatefeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatefeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
