import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  // function that presents a snackbar in case of error with auth
  presentSnackbar() {
    this.snackbar.open('An error has occurred, please try again', 'Try Again', {
      duration: 2500,
    });
  }

  // injectable function that allows a user to create an account with email + password
  async signUpWithEmailAndPassword(email: string, password: string) {
    console.log(email, password);
  }

  // injectable function that allows a user to sign in with email + password
  async loginWithEmailAndPassword(email: string, password: string) {
    console.log(email, password);
  }

  // injectable function that allows a user to reset their password via email
  async resetPassword(email: string) {}

  // function that allows a user to sign in with google
  async signInWithGoogleAuthProvider() {
    console.log('Google Sign In Clicked!');
  }

  // function that allows a user to sign in anonymously
  async signInAnonymously() {
    await this.afAuth
      .signInAnonymously()
      .then(async (userRef) => {
        // create instance in db with uid
        const uid = await userRef.user.uid;
        this.db.collection('users').doc(uid).set({
          uid,
        });
      })
      .then(() => {
        // route user to home page
        this.router.navigate(['home']);
      })
      .catch((error) => {
        console.log(error);
        this.presentSnackbar();
        return;
      });
  }
}
