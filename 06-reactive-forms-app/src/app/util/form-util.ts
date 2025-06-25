import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

async function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 2500)
  })
}

export class FormUtil {

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  static isValidField(field: string, myForm: FormGroup): boolean | null {
    return myForm.controls[field].errors && myForm.controls[field].touched;
  }

  static getFieldError(field: string, myForm: FormGroup): string | null {
    if (!myForm.controls[field]) return null;
    const errors = myForm.controls[field].errors || {};
    return FormUtil.getTextErrors(errors)
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors && formArray.controls[index].touched
  }

  static getFieldErrorinArray(index: number, formArray: FormArray): string | null {
    if (formArray.controls.length === 0) return null;
    const errors = formArray.controls[index].errors || {};
    return FormUtil.getTextErrors(errors)
  }

  static arePasswordsEqual(field: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field)?.value;
      const field2Value = formGroup.get(field2)?.value;
      return field1Value === field2Value ? null : { notEqual: true }
    }
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep();
    const formValue = control.value;
    if (formValue === 'hola@mundo.com') {
      return {
        emailTaken: true
      }
    }
    return null;
  }

  static async notStrider(control: AbstractControl): Promise<ValidationErrors | null> {
    const value = control.value;
    return value === 'strider' ? { noStrider: true } : null;

  }

  static getTextErrors(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `Min length is ${errors['minlength'].requiredLength} characters.`;
        case 'min':
          return `Min value is ${errors['min'].min}`
        case 'email':
          return 'Invalid email'
        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtil.emailPattern) {
            return 'Invalid email format'
          }
          if (errors['pattern'].requiredPattern === FormUtil.namePattern) {
            return 'Invalid name format'
          }
          if (errors['pattern'].requiredPattern === FormUtil.notOnlySpacesPattern) {
            return 'Invalid name format'
          }
          return 'Invalid format'
        case 'emailTaken':
          return 'Email already in use'
        case 'noStrider':
          return 'Strider is not allowed'
        default:
          return 'Error no controlado';

      }
    }
    return null
  }
}

