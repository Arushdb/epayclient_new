import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostfeeComponent } from './postfee.component';

describe('PostfeeComponent', () => {
  let component: PostfeeComponent;
  let fixture: ComponentFixture<PostfeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostfeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostfeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
