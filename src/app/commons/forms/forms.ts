import {FormControl, FormGroup, Validators} from '@angular/forms';
import {validate, validateSync} from 'class-validator';
import {Subject, ReplaySubject} from 'rxjs';


export class EvFormGroup<T> extends FormGroup {

  constructor(controls: any) {
    super(controls);

    this.valueChanges.subscribe(() => {
      this.doValidation();
    });

    this.doValidation();
  }


  getControls(): EvFormControl[] {
    return Object.keys(this.controls)
      .map(k => this.controls[k] as EvFormControl);
  }

  getModel(): T {
    return this.value as T;
  }


  getControl(name: string) {
    return this.controls[name] as EvFormControl;
  }

  addMessageErrors(errors) {
    Object.keys(errors).map(key => {
      if (this.getControl(key)) {
        this.getControl(key).setErrors({'message': errors[key]});
      }
    });
  }

  doValidation() {

    const result = validateSync(this.getModel());

    result.forEach(error => {
      const control = this.getControl(error.property);
      Object.values(error.constraints).forEach(m => control.addError(m));
    });

  }
}


export class EvFormControl extends FormControl {
  label: string;
  name: string;

  constructor(label: string, name: string, value: any, validators: any = Validators.nullValidator) {
    super(value, validators);
    this.label = label;
    this.name = name;
  }

  addMessageErrors(errors) {
    if (errors[this.name]) {
      this.setErrors({'message': errors[this.name]});
    }
  }

  addError(message: string) {
    if (!this.errors || !this.errors.message) {
      this.setErrors({'message': []});
    }
    if (this.errors.message.indexOf(message) < 0) {
      this.errors.message.push(message);
    }
  }
}
