import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumber } from 'libphonenumber-js';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  /**
   * Custom phome pipe that formats the phone number into international phone code
   * @param phoneValue
   */
  transform(phoneValue: number | string): string {
    const stringPhone = phoneValue + '';
    const phoneNumber = parsePhoneNumber(stringPhone, 'ZA');
    const formatted = phoneNumber.formatInternational();
    return formatted;
  }
}
