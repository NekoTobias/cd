import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatemessageComponent } from './privatemessage.component';

describe('PrivatemessageComponent', () => {
  let component: PrivatemessageComponent;
  let fixture: ComponentFixture<PrivatemessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivatemessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatemessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
