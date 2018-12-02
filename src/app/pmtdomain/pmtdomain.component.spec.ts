import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmtdomainComponent } from './pmtdomain.component';

describe('PmtdomainComponent', () => {
  let component: PmtdomainComponent;
  let fixture: ComponentFixture<PmtdomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmtdomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmtdomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
