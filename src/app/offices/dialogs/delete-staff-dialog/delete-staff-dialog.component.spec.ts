import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteStaffDialogComponent } from './delete-staff-dialog.component';

describe('DeleteStaffDialogComponent', () => {
  let component: DeleteStaffDialogComponent;
  let fixture: ComponentFixture<DeleteStaffDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteStaffDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteStaffDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
