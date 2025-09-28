import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../service/authservice/auth-service.service';
import { Router } from '@angular/router';
import { SignInWithGoogleComponent } from "../sign-in-with-google/sign-in-with-google.component";

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [ReactiveFormsModule, CommonModule, SignInWithGoogleComponent],
  templateUrl: './login.component.html',  
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
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

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login data:', this.loginForm.value);

      this.authService.login(this.loginForm.value).subscribe(
        (resp: any) => {
          console.log(resp);
          // SSR-safe localStorage usage
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', resp.jwtToken);
            localStorage.setItem('user', JSON.stringify(resp.username)); 
          }
          alert('Login Successful');
          this.router.navigateByUrl("/home");
        },
        (error: any) => {
          console.log(error);
          alert('Something went wrong');
        }
      );

    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}
