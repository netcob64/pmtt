import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmtversionComponent } from './pmtversion.component';

describe('PmtversionComponent', () => {
  let component: PmtversionComponent;
  let fixture: ComponentFixture<PmtversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmtversionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmtversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
