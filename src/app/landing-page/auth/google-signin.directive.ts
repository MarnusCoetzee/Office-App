import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appGoogleSignin]',
})
export class GoogleSigninDirective {
  constructor() {}

  @HostListener('click')
  onClick() {
    console.log('Google Sign In');
  }
}
