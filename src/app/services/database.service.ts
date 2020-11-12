import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { switchMap } from 'rxjs/operators';
import { Office, Employee } from '../model/datamodels';
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  /**
   * OFFICE Functionality
   * Create office, get all offices, delete office
   */

  /**
   * Get all offices owned by currently logged in user
   * Returns an empty array if no offices created yet
   * Returns all offices owned by user
   */
  getUserOffices() {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<Office>('offices', (ref) =>
              ref.where('ownerId', '==', user.uid)
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );
  }

  /**
   * Get Single Office From DB
   * @param office
   * @param id
   */
  getSingleOffice(officeId: string) {
    return this.db.collection('offices').doc(officeId).valueChanges();
  }

  /**
   * Create a new office data object for the logged in user
   * @param office
   */
  async createNewoffice(office: Office, id: string) {
    const user = await this.afAuth.currentUser;
    return this.db
      .collection('offices')
      .doc(id)
      .set({
        ...office,
        ownerId: user.uid,
        totalEmployees: 0,
      });
  }

  /**
   * Update office details
   * @param officeId
   */
  updateOfficeDetails(office: Office, officeId: string) {
    return this.db
      .collection('offices')
      .doc(officeId)
      .update({
        ...office,
      });
  }

  /**
   * Delete office from db via id
   * @param id
   */
  deleteOffice(officeId: string) {
    return this.db.collection('offices').doc(officeId).delete();
  }

  /**
   * Office employee functions
   * Add employee, delete employee, update employee details
   */
  getOfficeEmployees(id: string) {
    return this.db
      .collection('offices')
      .doc(id)
      .collection('staff')
      .valueChanges();
  }

  /**
   * Add office employee
   * @param officeId
   * @param employee
   * @param staffId
   */
  addOfficeEmployee(officeId: string, employee: Employee, staffId: string) {
    return this.db
      .collection('offices')
      .doc(officeId)
      .collection('staff')
      .doc(staffId)
      .set({
        ...employee,
      });
  }

  /**
   * Increase office employee count +1 after addition
   * @param officeId
   */
  incrementOfficeEmployeeTotal(officeId: string) {
    const increase = firebase.default.firestore.FieldValue.increment(1);
    return this.db.collection('offices').doc(officeId).update({
      totalEmployees: increase,
    });
  }

  /**
   * Decrease office employee count -1 after delete
   * @param officeId
   */
  decreaseOfficeEmployeeTotal(officeId: string) {
    const increase = firebase.default.firestore.FieldValue.increment(-1);
    return this.db
      .collection('offices')
      .doc(officeId)
      .update({
        totalEmployees: increase,
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Edit office employee object in the db
   * @param officeId
   * @param employeeId
   * @param data
   */
  editOfficeEmployee(officeId: string, employeeId: string, data: Employee) {
    return this.db
      .collection('offices')
      .doc(officeId)
      .collection('staff')
      .doc(employeeId)
      .update({
        ...data,
      });
  }

  /**
   * Delete office employee via office id and employee id
   * @param officeId
   * @param employeeId
   */
  removeOfficeEmployee(officeId: string, employeeId: string) {
    return this.db
      .collection('offices')
      .doc(officeId)
      .collection('staff')
      .doc(employeeId)
      .delete();
  }
}
