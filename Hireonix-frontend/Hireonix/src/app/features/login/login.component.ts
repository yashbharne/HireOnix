import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/AuthService/auth.service';
import { LocalStorageService } from '../../core/services/localStorage/local-storage.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loading = false;
  error: string | null = null;
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private localService: LocalStorageService
  ) {}

  onSubmit() {
    if (!this.loginForm.invalid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.localService.setToken(res.token);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}
