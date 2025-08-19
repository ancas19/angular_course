import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  standalone:true,
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  authService=inject(AuthService);
  router=inject(Router);
  formBuilder = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });


  onSubmit() {
    if (this.loginForm.invalid) {
      this.showError();
      return;
    }
    const { email = '', password = '' } = this.loginForm.value;
    this.authService.login(email!, password!)
    .subscribe((isValid)=>{
        if(isValid){
          this.router.navigateByUrl('/');
          return;
        }
       this.showError();
    });
  }


  showError() {
      this.hasError.set(true);
      setTimeout(()=>{
        this.hasError.set(false);
      },2000);
  }


}
