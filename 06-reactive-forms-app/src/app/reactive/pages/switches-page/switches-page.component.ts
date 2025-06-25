import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtil } from '../../../util/form-util';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent {

  private fb = inject(FormBuilder);
  formUtil=FormUtil;

  myForm: FormGroup = this.fb.group({
    gender: [, Validators.required],
    wantNotifications: [true],
    termsAndConditions: [false, Validators.requiredTrue]
  })


  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) return;
    console.log(this.myForm.value);
  }

}
