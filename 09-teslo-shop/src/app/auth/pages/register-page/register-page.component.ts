import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);
  hasError = signal(false);
  isPosting = signal(false);
  registerForm = this.fb.group(
    {
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }
  );



  onSubmit() {
    if (this.registerForm.invalid) {
      this.showError();
      return;
    }
    const { email = '', password = '', fullName = '' } = this.registerForm.value;
    this.authService.registerUser({ email: email!, password: password!, fullName: fullName! })
      .subscribe((isValid) => {
        if (isValid) {
          console.log(isValid)
          this.router.navigateByUrl('/');
          return;
        }
        this.showError();
      });
  }


  showError() {
    this.hasError.set(true);
    setTimeout(() => {
      this.hasError.set(false);
    }, 2000);
  }

}
