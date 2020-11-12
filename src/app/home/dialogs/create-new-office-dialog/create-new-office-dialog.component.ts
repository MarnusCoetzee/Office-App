import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Office } from 'src/app/model/datamodels';
import { DatabaseService } from 'src/app/services/database.service';
import { officeColors, Color } from '../office-colors';
@Component({
  selector: 'app-create-new-office-dialog',
  templateUrl: './create-new-office-dialog.component.html',
  styleUrls: ['./create-new-office-dialog.component.scss'],
})
export class CreateNewOfficeDialogComponent implements OnInit {
  // office colours
  officeColours: Color[] = officeColors;
  // office colour default
  selectedColour: string = 'black';
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
    // Initialise Form
    this.initOfficeForm();
  }

  private initOfficeForm() {
    // Build Form
    this.officeDetailsForm = this.fb.group({
      officeName: ['', Validators.required],
      officeEmailAddress: ['', Validators.required],
      officeTellNumber: ['', Validators.required],
      officeAddress: ['', Validators.required],
      maxOccupants: ['', Validators.required],
    });
  }

  // save new office to firestore
  async onClickSaveNewOffice() {
    this.isLoading = true;
    const ownerId = await (await this.afAuth.currentUser).uid;
    // create office id via firestore
    const id = this.db.createId();
    // instantiate office object to save to firestore
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

    // call database service and send office object to db
    this.databaseService
      .createNewoffice(office, id)
      // execute when successfully added to db
      .then(() => {
        this.dialogRef.close();
        this.snackbar.open('Successfully added a new office', '', {
          duration: 2000,
        });
        this.isLoading = false;
      })
      // handle errors
      .catch(() => {
        this.isLoading = false;
        this.snackbar.open('An error has occurred, please try again', 'Okay', {
          duration: 2000,
        });
        return;
      });
  }

  onClickCloseDialog() {
    this.dialogRef.close();
  }
}
