import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../service/authservice/auth-service.service';
import { Router } from '@angular/router';
import { SignInWithGoogleComponent } from "../sign-in-with-google/sign-in-with-google.component";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SignInWithGoogleComponent],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // SSR-safe localStorage check
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token') || '';
      if (token) {
        this.router.navigateByUrl('/home');
      }
    }
  }

  // Custom validator to check if password and confirmPassword match
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password !== confirmPassword ? { passwordMismatch: true } : null;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { confirmPassword, ...signupData } = this.signupForm.value;
      this.authService.signup(signupData).subscribe(
        (resp: any) => {
          console.log(resp);
          alert('Signup Successful!');
          this.router.navigateByUrl("/login");
        },
        (error: any) => {
          console.log(error);
          alert('Something went wrong');
        }
      );
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  get f() {
    return this.signupForm.controls;
  }
}
