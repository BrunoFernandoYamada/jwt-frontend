import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService : AuthenticationService
  ) { 
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/']);
  }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;

    this.authenticationService.login(this.f.username.value, this.f.password.value)
    .pipe(first())
    .subscribe(
      data => { 
        this.router.navigate(['']);
      },
      error => {
        this.error = error;
        this.loading = false;
      }        
    );
}

  get f() { return this.loginForm.controls; }

}
