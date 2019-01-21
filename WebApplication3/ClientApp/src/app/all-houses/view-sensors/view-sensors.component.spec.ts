import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSensorsComponent } from './view-sensors.component';

describe('ViewSensorsComponent', () => {
  let component: ViewSensorsComponent;
  let fixture: ComponentFixture<ViewSensorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSensorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
