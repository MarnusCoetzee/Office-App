import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

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
    console.log('Anon Sign In Clicked!');
  }
}
