import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
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
      .set(
        {
          ...office,
        },
        { merge: true }
      );
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
}
