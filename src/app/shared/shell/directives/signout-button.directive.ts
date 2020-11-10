import { Directive, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Directive({
  selector: '[appSignoutButton]',
})
export class SignoutButtonDirective {
  constructor(private authService: AuthService) {}

  @HostListener('click')
  onClick() {
    this.authService.signout();
  }
}
