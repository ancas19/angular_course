import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtil {
    static isValidField(field: string, myForm: FormGroup): boolean | null {
        return myForm.controls[field].errors && myForm.controls[field].touched;
    }

    static getFieldError(field: string, myForm: FormGroup): string | null {
    if (!myForm.controls[field]) return null;
    const errors = myForm.controls[field].errors || {};
    return FormUtil.getTextErrors(errors)
  }

  static isValidFieldInArray(formArray:FormArray, index:number) {
    return formArray.controls[index].errors && formArray.controls[index].touched
  }

   static getFieldErrorinArray(index: number, formArray: FormArray): string | null {
    if (formArray.controls.length===0) return null;
    const errors =formArray.controls[index].errors || {};
    return FormUtil.getTextErrors(errors)
  }

  static getTextErrors(errors:ValidationErrors){
      for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `Min length is ${errors['minlength'].requiredLength} characters.`;
        case 'min':
          return `Min value is ${errors['min'].min}`

      }
    }
    return null
  }
}

