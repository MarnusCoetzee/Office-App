import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  /**
   * Form control + functions
   */
  form: FormGroup;
  // form types, default signup
  type: 'login' | 'signup' | 'reset' = 'signup';
  // loading state
  loading = false;

  serverMessage: string;

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialise the form for email + password login
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: [''],
    });
  }

  // helper function that changes the form state from login, signup, reset
  changeType(val) {
    this.type = val;
  }

  // get the form type from the UI
  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  // verify passwords matching
  get passwordDoesMatch() {
    if (this.type !== 'signup') {
      return true;
    } else {
      return this.password.value === this.passwordConfirm.value;
    }
  }

  async onSubmit() {
    this.loading = true;

    const email = this.email.value;
    const password = this.password.value;

    try {
      if (this.isLogin) {
      }
      if (this.isSignup) {
      }
      if (this.isPasswordReset) {
        this.serverMessage = 'Check your email';
      }
    } catch (err) {
      this.serverMessage = err;
    }
    this.loading = false;
  }
}
