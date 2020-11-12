import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Office } from 'src/app/model/datamodels';
import { DatabaseService } from 'src/app/services/database.service';
import { Color, officeColors } from '../office-colors';

@Component({
  selector: 'app-edit-office',
  templateUrl: './edit-office.component.html',
  styleUrls: ['./edit-office.component.scss'],
})
export class EditOfficeComponent implements OnInit {
  officeId: string;

  isLoading: boolean;

  officeSubscription: Subscription;
  officeDetails: Office;

  editOfficeForm: FormGroup;

  // office colours
  officeColours: Color[] = officeColors;
  // office colour default
  selectedColour: string = 'black';

  constructor(
    private dialogRef: MatDialogRef<EditOfficeComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private dbService: DatabaseService,
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private snackbar: MatSnackBar
  ) {
    this.officeId = data.officeId;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.officeSubscription = this.dbService
      .getSingleOffice(this.officeId)
      .subscribe((officeResult: Office) => {
        this.officeDetails = officeResult;
        this.initEditForm();
        this.isLoading = false;
      });
  }

  private initEditForm() {
    this.editOfficeForm = this.fb.group({
      name: [this.officeDetails.name, Validators.required],
      email: [this.officeDetails.email, Validators.required],
      tellNumber: [this.officeDetails.tellNumber, Validators.required],
      location: [this.officeDetails.location, Validators.required],
      maxOfficeOccupants: [
        this.officeDetails.maxOfficeOccupants,
        Validators.required,
      ],
    });
  }

  // getters and setters for form controls
  get nameFromForm() {
    return this.editOfficeForm.get('name');
  }

  get emailFromForm() {
    return this.editOfficeForm.get('email');
  }

  get tellNumberFromForm() {
    return this.editOfficeForm.get('tellNumber');
  }

  get locationFromForm() {
    return this.editOfficeForm.get('location');
  }

  get maxOccupantsFromForm() {
    return this.editOfficeForm.get('maxOfficeOccupants');
  }

  onClickClearFormField(type: string) {
    switch (type) {
      case 'name':
        this.nameFromForm.reset();
        break;
      case 'email':
        this.emailFromForm.reset();
        break;
      case 'tellNumber':
        this.tellNumberFromForm.reset();
        break;
      case 'location':
        this.locationFromForm.reset();
        break;
      case 'maxOfficeOccupants':
        this.maxOccupantsFromForm.reset();
        break;
    }
  }

  onClickCloseForm() {
    this.dialogRef.close();
  }

  async onClickSaveNewOfficeDetails() {
    this.isLoading = true;
    const id = this.officeId;
    const ownerId = (await this.afAuth.currentUser).uid;
    const name = this.editOfficeForm.value.name;
    const email = this.editOfficeForm.value.email;
    const tellNumber = this.editOfficeForm.value.tellNumber;
    const location = this.editOfficeForm.value.location;
    const maxOfficeOccupants = this.editOfficeForm.value.maxOfficeOccupants;
    const totalEmployees = this.officeDetails.totalEmployees;
    const officeColor = '';
    const office: Office = {
      id,
      ownerId,
      name,
      email,
      tellNumber,
      location,
      maxOfficeOccupants,
      totalEmployees,
      officeColor,
    };
    this.dbService
      .updateOfficeDetails(office, id)
      .then(() => {
        this.dialogRef.close();
        this.snackbar.open('Successfully updated office', '', {
          duration: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
        this.isLoading = false;
        this.snackbar.open('An error has occurred, please try again', '', {
          duration: 2000,
        });
        return;
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.officeSubscription) {
      this.officeSubscription.unsubscribe();
    }
  }
}
