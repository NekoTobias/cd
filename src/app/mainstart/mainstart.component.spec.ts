import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainstartComponent } from './mainstart.component';

describe('MainstartComponent', () => {
  let component: MainstartComponent;
  let fixture: ComponentFixture<MainstartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainstartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainstartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
