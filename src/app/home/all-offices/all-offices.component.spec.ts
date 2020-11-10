import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOfficesComponent } from './all-offices.component';

describe('AllOfficesComponent', () => {
  let component: AllOfficesComponent;
  let fixture: ComponentFixture<AllOfficesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllOfficesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
