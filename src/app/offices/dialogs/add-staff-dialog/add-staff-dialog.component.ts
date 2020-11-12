import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/model/datamodels';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-staff-dialog',
  templateUrl: './add-staff-dialog.component.html',
  styleUrls: ['./add-staff-dialog.component.scss'],
})
export class AddStaffDialogComponent implements OnInit {
  officeId: string;

  isLoading: boolean;

  staffForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddStaffDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private db: AngularFirestore,
    private dbService: DatabaseService,
    private snackbar: MatSnackBar
  ) {
    this.officeId = data.officeId; // get office id passed on via dialog
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    // instantiate formgroup
    this.staffForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  onClickSaveStaffToDb() {
    this.isLoading = true;
    const officeId = this.officeId;
    const employeeId = this.db.createId();
    const firstName = this.staffForm.value.firstName;
    const lastName = this.staffForm.value.lastName;
    // create staff object
    const staffMember: Employee = {
      employeeId,
      firstName,
      lastName,
    };
    this.dbService
      .addOfficeEmployee(officeId, staffMember, employeeId)
      .then(() => {
        this.dbService.incrementOfficeEmployeeTotal(officeId);
        this.isLoading = false;
        this.dialogRef.close();
        this.snackbar.open('Successfully added staff member', '', {
          duration: 2000,
        });
      })
      .catch((error) => {
        // catch error + display snackbar
        this.snackbar.open('An error has occurred, please try again', 'Okay', {
          duration: 2000,
        });
        return;
      });
  }

  onClickCloseForm() {
    this.dialogRef.close();
  }
}
