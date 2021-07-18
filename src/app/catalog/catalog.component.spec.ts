import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatelogComponent } from './catalog.component';

describe('CatalogComponent', () => {
  let component: CatelogComponent;
  let fixture: ComponentFixture<CatelogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatelogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
