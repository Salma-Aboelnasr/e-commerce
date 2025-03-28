import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {

  private readonly authService= inject(AuthService)
  private router= inject(Router);

  step:number = 1;
  verifyEmail:FormGroup =new FormGroup( {
    email: new FormControl(null, [Validators.required, Validators.email])
  })

  verifyCode:FormGroup =new FormGroup( {
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6}$/)])
    
  })

  resetPass:FormGroup =new FormGroup( {
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)])
  })

  verifyEmailSubmit():void{

    let emailValue = this.verifyEmail.get('email')?.value ; //email value
    this.resetPass.get('email')?.patchValue(emailValue)
    this.authService.setEmailVerify( this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res)
        if(res.statusMsg === "success") this.step=2;
      },
      error: (err) => console.error(err)
    })
  }

  verifyCodeSubmit():void{
    this.authService.setCodeVerify( this.verifyCode.value).subscribe({
      next: (res) => {
        console.log(res)
        if(res.status === "Success") {
          this.step=3;
        }
      },
      error: (err) => console.error(err)
    })
  }
  resetPasswordSubmit():void{
    this.authService.resetPassword( this.resetPass.value).subscribe({
      next: (res) => {
        console.log(res)
        localStorage.setItem('token', res.token);

        this.authService.getUserData();

        this.router.navigate(['/home']);
      },
      error: (err) => console.error(err)
    })
  }
}
