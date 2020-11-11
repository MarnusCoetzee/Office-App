import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-edit-staff-dialog',
  templateUrl: './edit-staff-dialog.component.html',
  styleUrls: ['./edit-staff-dialog.component.scss'],
})
export class EditStaffDialogComponent implements OnInit {
  officeId: string;
  employeeId: string;
  employeeFirstName: string;
  employeeLastName: string;

  staffForm: FormGroup;

  isLoading: boolean;
  constructor(
    private dialogRef: MatDialogRef<EditStaffDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private dbService: DatabaseService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.employeeId = data.employeeId;
    this.officeId = data.officeId;
    this.employeeFirstName = data.firstName;
    this.employeeLastName = data.lastName;
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.staffForm = this.fb.group({
      firstName: [''],
      lastName: [''],
    });
  }
}
