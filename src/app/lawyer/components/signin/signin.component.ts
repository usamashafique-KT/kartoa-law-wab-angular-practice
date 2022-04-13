import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { createPasswordStrengthValidator, emailValidator } from 'src/app/custom-validations/form-validations';
import { AccountService } from 'src/app/services/account.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  returnUrl: string;
  socialUser: SocialUser;

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, emailValidator()]
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        createPasswordStrengthValidator()
      ]
    }),
  });

  submitted = false;
  isFormSubmitted = false;
  errormessage: string = "";


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toastService: ToastService,
    private socialAuthService: SocialAuthService,
  ) {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    var _signInUser = JSON.parse(localStorage.getItem('lawyersignininfo') || 'null');

    if (_signInUser) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }


  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // console.log(this.returnUrl)

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      console.log("socialUser :", JSON.stringify(this.socialUser));

    }, error => {
      console.error("Error :", error);
    });
  }

  signInWithGmail(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    console.warn(this.loginForm);
    console.warn(this.loginForm.value);

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.signIn(this.loginForm.value);
  }

  signIn(data: any) {

    this.errormessage = "";
    let _data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      RememberMe: true
    };

    this.accountService.lawyerSignIn(_data).then((response: any) => {
      console.log("response", response)
      this.isFormSubmitted = false;

      //<----show toast        
      this.toastService.isToastVisible.emit({ message: "Successfully Sign In", success: true });
      //show toast ---->

      if (response) {

        localStorage.setItem('lawyersignininfo', JSON.stringify(response.Data));
        localStorage.setItem('_B_JW_Token', response.Data.JWToken);

        // login successful so redirect to return url     
        setTimeout(() => {
          this.router.navigateByUrl("lawyer/home");
        }, 500);
      }
    }).catch((error) => {
      this.isFormSubmitted = false;
      // this.errormessage = error.error;
      console.error(error)
      //<----show toast        
      this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
      //show toast ---->
    });
  }
}