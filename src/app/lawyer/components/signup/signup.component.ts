import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ISignUp } from 'src/app/interfaces/isign-up';
import { ILawyerSignUp } from 'src/app/interfaces/ilawyer-sign-up';
import { UserService } from '../../../services/user.service';
import { AccountService } from 'src/app/services/account.service';
import { CityService } from 'src/app/services/city.service';
import { createPasswordStrengthValidator, emailValidator } from 'src/app/custom-validations/form-validations';
import * as bootstrap from 'bootstrap';
import { ToastService } from 'src/app/services/toast.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  socialUser: SocialUser;

  step: number = 3;
  returnUrl: string;

  // signUpStepOne: new FormGroup({
  //   email: new FormControl(''),
  // })

  signUpStepOne = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, emailValidator()]
    })
  });

  signUpStepTwo = new FormGroup({
    accountType: new FormControl('1', {
      validators: [Validators.required]
    }),
    name: new FormControl('', {
      validators: []
    }),
    size: new FormControl('', {
      validators: [Validators.required]
    }),
    city: new FormControl('', {
      validators: [Validators.required]
    })
  });

  signUpStepThree = new FormGroup({
    firstName: new FormControl('', {
      validators: [Validators.required]
    }),
    lastName: new FormControl('', {
      validators: [Validators.required]
    }),
    mobileNumber: new FormControl('', {
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        createPasswordStrengthValidator()
      ]
    }),
    comfirmPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8),]
    })
  });

  phoneVerificationcode: string;

  signUpStepFour = new FormGroup({
    code: new FormControl('', {
      validators: [Validators.required]
    })
  });

  //create sign-up object
  lawyerSignUpInfo: ILawyerSignUp = {
    email: '',
    cityID: 0,
    firmName: '',
    isResend: false,
    organizationSizeID: 0,
    userTypeId: 0
  };

  //cites array
  public cities: any[] = [];

  submitted = false;
  isFormSubmitted = false;
  errormessage: string = "";

  isResendActive = true;
  resendLeftTime = 180;

  userId: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cityService: CityService,
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

    this.userId = this.route.snapshot.queryParams['userId'];

    if (!!this.userId) {

      var lawyersignuplogs = JSON.parse(localStorage.getItem('lawyersignuplogs') || 'null');

      if (!!lawyersignuplogs) {
        this.signUpStepThree.setValue({
          firstName: lawyersignuplogs.firstName,
          lastName: lawyersignuplogs.lastName,
          mobileNumber: lawyersignuplogs.mobileNumber,
          password: lawyersignuplogs.password,
          comfirmPassword: lawyersignuplogs.password,
        });

        const timeValue = setInterval(() => {
          this.resendLeftTime--;
          if (this.resendLeftTime == 0) {
            this.isResendActive = false;
            clearInterval(timeValue);
          }
        }, 1000);

        this.step = 4;
      } else {
        this.step = 3;

      }
    }
  }


  ngOnInit() {

    this.cityService.gets().then((response: any) => {
      this.cities = response.Data;
    }).catch((error) => {
      console.error("Error: ", error)

      //<----show toast        
      this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
      //show toast ---->
    });

    this.signUpStepTwo.get('accountType')?.valueChanges
      .subscribe(value => {
        this.changeValidation(value);
      }
      );
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      console.log("socialUser :", JSON.stringify(this.socialUser));

    }, error => {
      console.error("Error :", error);
    });

    // this.socialAuthService.initState.subscribe((data) => {
    //   console.log("socialUser :", JSON.stringify(data));
    // });

  }

  signUpWithGmail(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signUpWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  changeValidation(value: any) {
    if (value == '1') {
      this.signUpStepTwo.get('name')?.setValidators(Validators.required)
      this.signUpStepTwo.get('size')?.setValidators(Validators.required)
    } else {
      this.signUpStepTwo.get('name')?.clearValidators();
      this.signUpStepTwo.get('size')?.clearValidators();
    }

    this.signUpStepTwo.get("name")?.updateValueAndValidity();
    this.signUpStepTwo.get("size")?.updateValueAndValidity();
  }

  get one() { return this.signUpStepOne.controls; }

  onSubmitStepOne() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpStepOne.invalid) {
      return;
    }

    //call if form is valid
    this.errormessage = "";

    this.step = 2;

    this.changeValidation(this.signUpStepTwo.value.accountType);

    this.submitted = false;
    this.isFormSubmitted = false;
  }

  get two() { return this.signUpStepTwo.controls; }

  onSubmitStepTwo() {
    this.submitted = true;
    this.errormessage = "";
    // stop here if form is invalid
    if (this.signUpStepTwo.invalid) {
      return;
    }


    //abled/disabled submit button
    this.submitted = false;
    this.isFormSubmitted = true;

    //get values from form and set to obj
    this.lawyerSignUpInfo.email = this.signUpStepOne.value.email;
    this.lawyerSignUpInfo.userTypeId = parseInt(this.signUpStepTwo.value.accountType);
    this.lawyerSignUpInfo.cityID = parseInt(this.signUpStepTwo.value.city);

    if (this.lawyerSignUpInfo.userTypeId == 1) {
      this.lawyerSignUpInfo.firmName = this.signUpStepTwo.value.name;
      this.lawyerSignUpInfo.organizationSizeID = parseInt(this.signUpStepTwo.value.size);
    } else {
      this.lawyerSignUpInfo.firmName = '';
      this.lawyerSignUpInfo.organizationSizeID = 0;
    }

    this.lawyerSignUpInfo.isResend = false;

    //send info to the api  
    this.accountService.lawyerSignUpEmailVerification(this.lawyerSignUpInfo).then((response: any) => {

      //<----show toast        
      this.toastService.isToastVisible.emit({ message: response.Message, success: response.Succeeded });
      //show toast ---->

      if (response.Succeeded) {
        this.submitted = false;
        this.isFormSubmitted = false;
        this.step = 1;
      } else {
        this.errormessage = response.Message;
        this.submitted = false;
        this.isFormSubmitted = false;
      }

    }).catch((error) => {
      this.isFormSubmitted = false;
      console.error(error)

      //<----show toast        
      this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
      //show toast ---->

    });
  }

  get three() { return this.signUpStepThree.controls; }

  onSubmitStepThree() {
    this.submitted = true;
    this.errormessage = "";
    // stop here if form is invalid
    if (this.signUpStepThree.invalid) {
      return;
    }

    if (this.signUpStepThree.value.password != this.signUpStepThree.value.comfirmPassword) {
      this.errormessage = "Password and Confirm Password must be match."
      return;
    }

    //abled/disabled submit button
    this.submitted = false;
    this.isFormSubmitted = true;

    //get values from form and set to obj

    let _data = {
      phoneNo: this.signUpStepThree.value.mobileNumber,
      userId: this.userId,
      isResend: false
    }

    let lawyersignupinfo = {
      step: 4,
      userTypeId: 2,
      userId: this.userId,
      firstName: this.signUpStepThree.value.firstName,
      lastName: this.signUpStepThree.value.lastName,
      mobileNumber: this.signUpStepThree.value.mobileNumber,
      password: this.signUpStepThree.value.password,
    }

    //send info to the api  
    this.accountService.lawyerSignUpPhoneVerificationCodeSend(_data).then((response: any) => {

      //<----show toast        
      this.toastService.isToastVisible.emit({ message: response.Message, success: response.Succeeded });
      //show toast ---->

      if (response.Succeeded) {

        localStorage.setItem('lawyersignuplogs', JSON.stringify(lawyersignupinfo));

        this.submitted = false;
        this.isFormSubmitted = false;
        this.step = 4;
        this.isResendActive = true;
        this.resendLeftTime = 180;

        const timeValue = setInterval(() => {
          this.resendLeftTime--;
          if (this.resendLeftTime == 0) {
            this.isResendActive = false;
            clearInterval(timeValue);
          }
        }, 1000);

      } else {
        this.errormessage = response.Message;
        this.submitted = false;
        this.isFormSubmitted = false;
      }
    }).catch((error) => {
      this.isFormSubmitted = false;
      console.error(error)

      //<----show toast        
      this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
      //show toast ---->
    });
  }

  get four() { return this.signUpStepFour.controls; }

  onSubmitStepFour() {
    // this.submitted = true;
    // this.errormessage = "";
    // // stop here if form is invalid
    // if (this.signUpStepFour.invalid) {
    //   return;
    // }

    // //abled/disabled submit button
    // this.submitted = false;
    this.isFormSubmitted = true;

    //get values from form and set to obj

    let _data = {
      userTypeId: 2,
      userId: this.userId,
      firstName: this.signUpStepThree.value.firstName,
      lastName: this.signUpStepThree.value.lastName,
      PhoneNo: this.signUpStepThree.value.mobileNumber,
      password: this.signUpStepThree.value.password,
      otp: this.phoneVerificationcode,
    }


    //send info to the api  
    this.accountService.lawyerSignUpWithEmail(_data).then((response: any) => {

      //<----show toast        
      this.toastService.isToastVisible.emit({ message: response.Message, success: response.Succeeded });
      //show toast ---->

      if (response.Succeeded) {
        localStorage.setItem('lawyersignupinfo', JSON.stringify(response.Data));
        localStorage.removeItem('lawyersignuplogs');

        setTimeout(() => {
          this.router.navigateByUrl("lawyer/sigin");
        }, 500);

        this.submitted = false;
        this.isFormSubmitted = false;
      } else {
        this.errormessage = response.Message;
        this.submitted = false;
        this.isFormSubmitted = false;
      }
    }).catch((error) => {
      this.isFormSubmitted = false;
      console.error(error)

      //<----show toast        
      this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
      //show toast ---->
    });
  }

  resendMobileVerificationCode() {

    this.isFormSubmitted = true;

    let _data = {
      phoneNo: this.signUpStepThree.value.mobileNumber,
      userId: this.userId,
      isResend: true
    }

    //send info to the api  
    this.accountService.lawyerSignUpPhoneVerification(_data).then((response: any) => {

      //<----show toast        
      this.toastService.isToastVisible.emit({ message: response.Message, success: response.Succeeded });
      //show toast ---->

      if (response.Succeeded) {

        this.isFormSubmitted = false;
        this.isResendActive = true;
        this.resendLeftTime = 180;


        const timeValue = setInterval(() => {
          this.resendLeftTime--;
          if (this.resendLeftTime == 0) {
            this.isResendActive = false;
            clearInterval(timeValue);
          }
        }, 1000);
      } else {
        this.errormessage = response.Message;
        this.submitted = false;
        this.isFormSubmitted = false;
      }
    }).catch((error) => {
      this.isFormSubmitted = false;
      console.error(error)

      //<----show toast        
      this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
      //show toast ---->

    });
  }

  // checkPasswordStrengthValidator(value: any) {
  //   if (value == '') {
  //     return false;
  //   }

  //   const hasUpperCase = /[A-Z]+/.test(value);

  //   const hasLowerCase = /[a-z]+/.test(value);

  //   const hasNumeric = /[0-9]+/.test(value);

  //   const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

  //   return passwordValid ? true : false;
  // }


  // this called every time when user changed the code
  onCodeChanged(code: any) {
    console.log(code)
  }

  // this called only if user entered full code
  onCodeCompleted(code: any) {
    console.log(code)
    this.phoneVerificationcode = code;
    this.onSubmitStepFour();
  }
}

// /lawyer/signup?userId=a1551787-a293-4e02-b2c6-b462f976cf22