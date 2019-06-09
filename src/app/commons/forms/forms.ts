import {FormControl, FormGroup, Validators} from '@angular/forms';
import {validate, validateSync} from 'class-validator';
import {Subject, ReplaySubject} from 'rxjs';


export class EvFormGroup<T> extends FormGroup {
  protected errorMessages: { [index: string]: any } = {};
  onValidation = new ReplaySubject<any>();

  constructor(controls: any) {
    super(controls);

    this.errorMessages = {};

    this.valueChanges.subscribe(() => {
      this.doValidation();
    });

    this.onValidation.subscribe(errors => {
      this.addMessageErrors(errors);
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

  resetErrors() {
    this.errorMessages = {};
  }

  doValidation() {
    const errors = {};
    const result = validateSync(this.getModel());

    result.forEach(error => {
      errors[error.property] = Object.keys(error.constraints).map(key => error.constraints[key]);
    });

    this.onValidation.next(errors);
  }

  addError(key: string, message: string) {
    if (!this.errorMessages[key]) {
      this.errorMessages[key] = [];
    }
    this.errorMessages[key].push(message);
    this.addMessageErrors(this.errorMessages);
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

  getErrorMessages() {
    const messages: string[] = [];

    if (this.errors) {
      // tslint:disable-next-line:forin
      for (const errorName in this.errors) {
        switch (errorName) {
          case 'required':
            messages.push(`${this.label} doit etre renseigné(e)`);
            break;
          case 'minlength':
            messages.push(`Votre ${this.label} doit avoir au moins ${this.errors['minlength'].requiredLength} charactères`);
            break;
          case 'maxlength':
            messages.push(`Votre ${this.label} doit avoir au moins ${this.errors['maxlength'].requiredLength} charactères`);
            break;
          case 'pattern':
            messages.push(`Le champ ${this.label} contient des charactères illégaux`);
            break;
          case 'message':
            messages.push(this.errors['message']);
            break;
        }
      }
    }
    return messages;
  }

  addMessageErrors(errors) {
    if (errors[this.name]) {
      this.setErrors({'message': errors[this.name]});
    }
  }
}
