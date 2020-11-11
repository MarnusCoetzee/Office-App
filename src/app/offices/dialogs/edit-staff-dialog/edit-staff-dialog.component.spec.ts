import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStaffDialogComponent } from './edit-staff-dialog.component';

describe('EditStaffDialogComponent', () => {
  let component: EditStaffDialogComponent;
  let fixture: ComponentFixture<EditStaffDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStaffDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStaffDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
