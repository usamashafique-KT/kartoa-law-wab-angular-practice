import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        //var regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const hasSpecial = /[!@#\$%\^\&*\)\(+=._-]+/.test(value);

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;

        return !passwordValid ? { passwordStrength: true } : null;
    }
}


export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    const isValid = emailRegex.test(value);
    return !isValid ? { customValidator: true } : null;
  }
}

export function ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}


export interface BooleanFn {
  (): boolean;
}

export function conditionalValidator(predicate: BooleanFn,
  validator: ValidatorFn,
  errorNamespace?: string): ValidatorFn {
  return (formControl => {
    if (!formControl.parent) {
      return null;
    }

    let error = null;

    if (predicate()) {
      error = validator(formControl);
    }

    if (errorNamespace && error) {
      const customError = {};
      customError[errorNamespace] = error;
      error = customError
    }

    return error;
  })
}