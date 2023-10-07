import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotpassService } from 'src/app/core/services/forgotpass.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  constructor(private _ForgotpassService:ForgotpassService,private _Router:Router){}
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  isloadin: boolean = false;
  email: string = '';
  statusMsg: string = '';

  forgotform: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email])
  })

  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('',[Validators.required])
  })

  resetpassForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,14}$/)])
  })
  forgotpassword(): void{
    this.isloadin = true;
    let userEmail = this.forgotform.value;
    this.email = userEmail.email;
    this._ForgotpassService.forgotPassword(userEmail).subscribe({
      next: (res) => {
        this.isloadin = false;
        this.statusMsg = res.message;
        this.step1 = false;
        this.step2 = true;
      },
      error: (err) => {
        this.isloadin = false;
        this.statusMsg = err.error.message;
      }
    })
  }
  resetCode(): void{
    this.isloadin = true;
    let resetcod=this.resetCodeForm.value
    this._ForgotpassService.resetCode(resetcod).subscribe({
      next: (res) => {
        this.isloadin = false;
        this.statusMsg = res.status;
        this.step2 = false;
        this.step3 = true;
      },
      error: (err) => {
        this.isloadin = false;
        this.statusMsg = err.error.message;
      }
    })
  }
  newResetPassword(): void{
    this.isloadin = true;
    let resetForm = this.resetpassForm.value;
    resetForm.email=this.email
    this._ForgotpassService.resetpassword(resetForm).subscribe({
      next: (res) => {
        if (res.token) {
        this.isloadin = false;
        localStorage.setItem("utoken", res.token);
          this.statusMsg = "Success";
          this._Router.navigate(["/home"]);
        }
      },
      error: (err) => {
        this.isloadin = false;
        this.statusMsg = err.error.message;
      }
    })
  }
}
