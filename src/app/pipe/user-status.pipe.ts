import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userStatus'
})
export class UserStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let status = '';
    switch (value) {
      case 0:
        status = 'Signed up';
        break;
      case 1:
        status = 'Submitted';
        break;
      case 2:
        status = 'Approved';
        break;
      case 3:
        status = 'Rejected';
        break;
      case 4:
        status = 'Suspended';
        break;
      case 5:
        status = 'FOF';
        break;
      case 6:
        status = 'Plus one';
        break;
      case 7:
        status = 'Business contact';
        break;
    }
    return status;
  }

}
