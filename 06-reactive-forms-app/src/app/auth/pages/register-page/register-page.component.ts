import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtil } from '../../../util/form-util';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  formUtil=FormUtil;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required,Validators.pattern(this.formUtil.namePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.formUtil.emailPattern)], [this.formUtil.checkingServerResponse]],
    username: ['', [Validators.required, Validators.pattern(this.formUtil.notOnlySpacesPattern)],[this.formUtil.notStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  },

    {
      validators:[this.formUtil.arePasswordsEqual('password','confirmPassword')]
    }
  );
  onSubmit() {
    this.myForm.markAllAsTouched();
    if(this.myForm.invalid) return
    console.log(this.myForm.value);
  }

 

}
