export interface IFormField {
  label: string;
  fieldName: string;
  fieldType: string;
  fieldValue: string;
  placeholder: string;
  values: IDropdown[]; // To fill dropdown
}

export interface IDropdown {
  displayValue: string;
  internalValue: string;
}

export interface IUser {
  userName: string;
}
