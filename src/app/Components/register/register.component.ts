import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup,Validators,ReactiveFormsModule, FormControlOptions } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _AuthService: AuthService, private _Router:Router) { }
  errMsg: string = '';
  isloadin: boolean = false;
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,14}$/)]),
    rePassword: new FormControl(''),
    phone: new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, { validators: [this.checkRrpassword] } as FormControlOptions)
  
  checkRrpassword(gourp: FormGroup): void{
    const password = gourp.get('password');
    const rePassword = gourp.get('rePassword');
    if (rePassword?.value == "") {
      rePassword?.setErrors({ required: true });
    } else if(password?.value!=rePassword?.value){
      rePassword?.setErrors({mismatcg:true})
    }
  }
  handleForm(): void{
    const userData = this.registerForm.value;
    this.isloadin = true;
    if (this.registerForm.valid) {
      this._AuthService.register(userData).subscribe({
        next: (res) => {
          if (res.message) {
            this.isloadin = false;
            this._Router.navigate(['/signin']);
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
