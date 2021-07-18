import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLogoutComponent } from './employee-logout.component';

describe('EmployeeLogoutComponent', () => {
  let component: EmployeeLogoutComponent;
  let fixture: ComponentFixture<EmployeeLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeLogoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
