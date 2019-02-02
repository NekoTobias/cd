import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentersectionComponent } from './centersection.component';

describe('CentersectionComponent', () => {
  let component: CentersectionComponent;
  let fixture: ComponentFixture<CentersectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentersectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentersectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
