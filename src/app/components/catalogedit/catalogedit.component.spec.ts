import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogeditComponent } from './catalogedit.component';

describe('CatalogeditComponent', () => {
  let component: CatalogeditComponent;
  let fixture: ComponentFixture<CatalogeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
