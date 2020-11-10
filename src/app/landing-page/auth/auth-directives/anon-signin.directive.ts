import { Directive, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Directive({
  selector: '[appAnonSignin]',
})
export class AnonSigninDirective {
  constructor(private authService: AuthService) {}

  @HostListener('click')
  onClick() {
    this.authService.signInAnonymously();
  }
}
