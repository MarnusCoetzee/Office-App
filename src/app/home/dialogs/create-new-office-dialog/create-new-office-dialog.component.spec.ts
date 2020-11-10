import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewOfficeDialogComponent } from './create-new-office-dialog.component';

describe('CreateNewOfficeDialogComponent', () => {
  let component: CreateNewOfficeDialogComponent;
  let fixture: ComponentFixture<CreateNewOfficeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewOfficeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewOfficeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
