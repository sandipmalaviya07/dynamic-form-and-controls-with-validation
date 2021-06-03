import { Injectable } from '@angular/core';
import { IDropdown} from './app.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  getState() {
    let dropDown: IDropdown[] = [];
    let _stateGa = <IDropdown>{
      displayValue: 'GA',
      internalValue: 'GA',
    };
    dropDown.push(_stateGa);

    let _stateMi = <IDropdown>{
      displayValue: 'MI',
      internalValue: 'MI',
    };
    dropDown.push(_stateMi);
    let _stateTx = <IDropdown>{
      displayValue: 'TX',
      internalValue: 'TX',
    };
    dropDown.push(_stateTx);
    return dropDown;
  }

}
