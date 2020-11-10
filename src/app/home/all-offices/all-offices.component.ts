import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Office } from 'src/app/model/datamodels';
import { DatabaseService } from '../../services/database.service';
@Component({
  selector: 'app-all-offices',
  templateUrl: './all-offices.component.html',
  styleUrls: ['./all-offices.component.scss'],
})
export class AllOfficesComponent implements OnInit {
  isLoading: boolean;

  offices: Office[];
  officesSubscription: Subscription;

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    // start loading
    this.isLoading = true;
    // get all offices associated with the user's id
    this.officesSubscription = this.dbService
      .getUserOffices()
      // subscribe to offices that belong to user
      .subscribe((allOffices) => {
        this.offices = allOffices;
        console.log(this.offices);
        // stop loading
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.officesSubscription) {
      this.officesSubscription.unsubscribe();
    }
  }
}
