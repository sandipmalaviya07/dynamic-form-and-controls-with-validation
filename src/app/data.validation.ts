import { FormControl } from '@angular/forms';
export class DataValidator {
  static dateGreatherEqualToToday(control: FormControl): { [key: string]: any; } {
    let isValidFormat = false;
    let dateString = control.value;

    if(dateString != ""){
      var regEx = /^\d{4}-\d{2}-\d{2}$/;
      isValidFormat = dateString.match(regEx) != null;

      if (!isValidFormat)
        return { dateGreatherEqualToToday: true };
      else {
        let todayDate = new Date();
        const year = Number(control.value.substr(0, 4));
        const month = Number(control.value.substr(5, 2));
        const date = Number(control.value.substr(8, 2));
        let controlDate = new Date(year, month - 1, date, 23, 59, 59);

        if (todayDate < controlDate) return { dateGreatherEqualToToday: true };
        else {
          return { dateGreatherEqualToToday: false };
        }
      }
  }
    return { dateGreatherEqualToToday: false };
  }

  static checkIsUserExisting(control: FormControl): {[key: string]: any;}{
    let val=control.value;
    var users = ["UserDemo", "UserTest", "JohnUser", "TestUser"];
    var a = users.indexOf(val);
    if (a > -1) {
      return {checkIsUserExisting:true};
    } else {
      return {checkIsUserExisting:false};
    }
  }
}
