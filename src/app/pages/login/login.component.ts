import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
    private readonly authService= inject(AuthService);
    private readonly router= inject(Router);
  
    isLoading: boolean = false;
    msgError: string ="";
    isSuccess: string =""
  
    loginForm: FormGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)])
    }, );
  
    submitForm():void{
      if(this.loginForm.valid){
        this.isLoading = true;
        this.authService.sendLoginForm(this.loginForm.value).subscribe({
          next: (res) => {
            console.log(res)
            if(res.message === "success"){ 
              this.isLoading =false;
              this.isSuccess = res.message;
              setTimeout(() => {
                //save token
                localStorage.setItem('token', res.token );
                //2 jwt 
                this.authService.getUserData()
                // navigat to home
                this.router.navigate(['/home']);
              }, 500);
              
            }
            } ,
          error: (err:HttpErrorResponse) => {
            console.error(err) 
            this.isLoading =false;
            //show error message to user
            this.msgError = err.error.message 
          }
        })
      }
    }

}
