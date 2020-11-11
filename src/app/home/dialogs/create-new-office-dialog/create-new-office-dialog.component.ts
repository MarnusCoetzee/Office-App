import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Office } from 'src/app/model/datamodels';
import { DatabaseService } from 'src/app/services/database.service';

interface Colours {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-new-office-dialog',
  templateUrl: './create-new-office-dialog.component.html',
  styleUrls: ['./create-new-office-dialog.component.scss'],
})
export class CreateNewOfficeDialogComponent implements OnInit {
  officeColours: Colours[] = [
    { value: 'black', viewValue: 'Black' },
    { value: 'blue', viewValue: 'Blue' },
    { value: 'green', viewValue: 'Green' },
    { value: 'yellow', viewValue: 'Yellow' },
    { value: 'red', viewValue: 'Red' },
  ];
  selectedColour: string;
  officeDetailsForm: FormGroup;

  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateNewOfficeDialogComponent>,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private databaseService: DatabaseService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initOfficeForm();
  }

  private initOfficeForm() {
    this.officeDetailsForm = this.fb.group({
      officeName: ['', Validators.required],
      officeEmailAddress: ['', Validators.required],
      officeTellNumber: ['', Validators.required],
      officeAddress: ['', Validators.required],
      maxOccupants: ['', Validators.required],
      officeColour: [''],
    });
  }

  async onClickSaveNewOffice() {
    this.isLoading = true;
    const ownerId = await (await this.afAuth.currentUser).uid;
    const id = this.db.createId();
    const office: Office = {
      id,
      name: this.officeDetailsForm.value.officeName,
      ownerId,
      email: this.officeDetailsForm.value.officeEmailAddress,
      tellNumber: this.officeDetailsForm.value.officeTellNumber,
      location: this.officeDetailsForm.value.officeAddress,
      maxOfficeOccupants: this.officeDetailsForm.value.maxOccupants,
      officeColor: this.selectedColour,
      totalEmployees: 0,
    };

    this.databaseService
      .createNewoffice(office, id)
      .then(() => {
        this.dialogRef.close();
        this.snackbar.open('Successfully added a new office', '', {
          duration: 2000,
        });
        this.isLoading = false;
      })
      .catch((error) => {
        this.snackbar.open('An error has occurred, please try again', 'Okay', {
          duration: 2000,
        });
        return;
      });

    console.log(office);
  }

  onClickCancel() {
    this.dialogRef.close();
  }
}
