import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  officeDetailsForm: FormGroup;

  constructor(private fb: FormBuilder) {}

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

  onClickSaveNewOffice() {}
}
