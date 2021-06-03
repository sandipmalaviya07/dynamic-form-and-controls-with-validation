import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IFormField, IDropdown, IUser } from './app.interface';
import { AppService } from './app.service';
import { DataValidator } from './data.validation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'demo-form';

  // Form declaration
  formDemo: FormGroup;
  lstForm: IFormField[] = [];

  outputStr: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService
  ) {}
  ngOnInit(): void {
    this.formDemo = this.formBuilder.group({});
    this.setForm();
  }
  setForm() {
    // text box
    // required filed validation
    // remote validation for check is username exits or not
    let _un = <IFormField>{
      label: 'User Name',
      fieldName: 'userName',
      fieldType: 'text',
      fieldValue: 'DemoUser',
    };
    this.lstForm.push(_un);

    // Text Box
    // With Require Field Validation
    let _fn = <IFormField>{
      label: 'First Name',
      fieldName: 'firstName',
      fieldType: 'text',
      fieldValue: 'Demo FirstName',
    };
    this.lstForm.push(_fn);

    // Text Box
    // With Require Field Validation
    let _ln = <IFormField>{
      label: 'Last Name',
      fieldName: 'lastName',
      fieldType: 'text',
      fieldValue: 'Demo lastName',
    };
    this.lstForm.push(_ln);

    // Text Box - Email
    // With Regex and Requitepatter Validation
    let _email = <IFormField>{
      label: 'Email',
      fieldName: 'email',
      fieldType: 'email',
      fieldValue: 'test@test.com',
    };
    this.lstForm.push(_email);

    // Text Box - contact Number
    // required field validation
    let _cn = <IFormField>{
      label: 'Phone',
      fieldName: 'phone',
      fieldType: 'text',
      fieldValue: '123-456-7890',
    };
    this.lstForm.push(_cn);

    // Text Box - date
    // custome validation - check date greater than or equal to today date
    let _dob = <IFormField>{
      label: 'Date Of Birth',
      fieldName: 'dob',
      fieldType: 'date',
      fieldValue: '',
    };
    this.lstForm.push(_dob);

    // radio
    // custome validation - check date greater than or equal to today date
    let _radio = <IFormField>{
      label: 'Are you married?',
      fieldName: 'marital',
      fieldType: 'radio',
      fieldValue: 'Y',
    };
    this.lstForm.push(_radio);

    // select-dropdown
    // custome validation - check date greater than or equal to today date
    // With fill dynamic dropdown values - (It can be comes from DB)
    // Here we are using a static method to get dropdown value (State List)
    let stateList = this.appService.getState(); // Get state list from DB
    let _ddlStateList = <IFormField>{
      label: 'State',
      fieldName: 'state',
      fieldType: 'select',
      fieldValue: '0',
      values: stateList,
    };
    this.lstForm.push(_ddlStateList);

    // after set form comtrols //set form control validation
    this.formValidation();
  }

  formValidation() {
    const group: any = {};
    for (var field of this.lstForm) {
      if (field.fieldType == 'text') {
        group[field.fieldName] = new FormControl(field.fieldValue || '', [
          Validators.required,
          DataValidator.checkIsUserExisting,
        ]);
      } else if (field.fieldName.toLowerCase().indexOf('email') > -1) {
        group[field.fieldName] = new FormControl(field.fieldValue || '', [
          Validators.required,
          Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$'),
        ]);
      } else if (field.fieldType == 'select') {
        group[field.fieldName] = new FormControl(
          field.fieldValue || '',
          Validators.required
        );
      } else if (field.fieldType == 'radio') {
        group[field.fieldName] = new FormControl(false, null);
      } else if (field.fieldType == 'date') {
        group[field.fieldName] = new FormControl(field.fieldValue || '', [
          Validators.required,
          DataValidator.dateGreatherEqualToToday,
        ]);
      }
    }
    this.formDemo = new FormGroup(group);
  }

  onSubmit() {
    this.formValidation();
    if (this.formDemo.valid) {
      console.log(this.lstForm);
    }
    //this.outputStr
  }
}
