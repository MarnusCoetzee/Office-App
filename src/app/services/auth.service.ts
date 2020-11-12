import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
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
    await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async (userRef) => {
        // create instance in db with uid
        const uid = await userRef.user.uid;
        const email = await userRef.user.email;
        this.db.collection('users').doc(uid).set({
          uid,
          email,
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

  // injectable function that allows a user to sign in with email + password
  async loginWithEmailAndPassword(email: string, password: string) {
    await this.afAuth
      .signInWithEmailAndPassword(email, password)
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

  // injectable function that allows a user to reset their password via email
  async resetPassword(email: string) {
    await this.afAuth.sendPasswordResetEmail(email);
  }

  // function that allows a user to sign in with google
  async signInWithGoogleAuthProvider() {
    await this.afAuth
      .signInWithPopup(new firebase.default.auth.GoogleAuthProvider())
      .then(async (userRef) => {
        // create instance in db with uid
        const uid = await userRef.user.uid;
        const email = await userRef.user.email;
        this.db.collection('users').doc(uid).set({
          uid,
          email,
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

  /**
   * Signout function
   */
  async signout() {
    await this.afAuth
      .signOut()
      .then(() => this.router.navigate(['']))
      .catch((error) => {
        console.log(error);
        this.presentSnackbar();
        return;
      });
  }
}
