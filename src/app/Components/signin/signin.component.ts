import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup,Validators,ReactiveFormsModule, FormControlOptions } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  constructor(private _AuthService: AuthService, private _Router:Router) { }
  errMsg: string = '';
  isloadin: boolean = false;
  signinForm: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,14}$/)]),
  })
  
  handleForm(): void{
    const userData = this.signinForm.value;
    this.isloadin = true;
    if (this.signinForm.valid) {
      this._AuthService.signin(userData).subscribe({
        next: (res) => {
          if (res.message == "success") {
            localStorage.setItem("utoken", res.token);
            this._AuthService.decodeUser()
            this.isloadin = false;
            this._Router.navigate(['/home']);
          }
        },
        error: (err) => {
            this.isloadin = false;
          this.errMsg = err.error.message;
        }
      })
    }
  }
}
