import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ISignUp } from 'src/app/interfaces/isign-up';
import { UserService } from '../../../services/user.service';
import { AccountService } from 'src/app/services/account.service';
import { CityService } from 'src/app/services/city.service';
import { createPasswordStrengthValidator, emailValidator } from 'src/app/custom-validations/form-validations';
import * as bootstrap from 'bootstrap';
import { IClientSignUp } from 'src/app/interfaces/iclient-sign-up';
import { ClientService } from 'src/app/services/client.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  step: number = 1;
  returnUrl: string;

  signUpStepOne = new FormGroup({
    phoneNo: new FormControl('', {
      validators: [Validators.required]
    }),
  });


  phoneVerificationcode: string;


  //create sign-up object
  clientSignInObj = {
    phoneNo: '',
    oTP: '',
    userTypeId: 3
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
    private clientService: ClientService,
    private toastService: ToastService,
  ) {

    // this.userId = this.route.snapshot.queryParams['userId'];

    // console.log("userId: ", this.userId)
    if (true) {

      var clientSignInLogs = JSON.parse(localStorage.getItem('clientsigninlogs') || 'null');

      if (!!clientSignInLogs) {
        this.signUpStepOne.setValue({
          phoneNo: clientSignInLogs.phoneNo
        });

        const timeValue = setInterval(() => {
          this.resendLeftTime--;
          if (this.resendLeftTime == 0) {
            this.isResendActive = false;
            clearInterval(timeValue);
          }
        }, 1000);

        this.step = 2;
      } else {
        this.step = 1;

      }
      console.log("step: ", this.step)
    }
  }


  ngOnInit() {




    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    console.log("returnUrl: ", this.returnUrl)

  }



  get one() { return this.signUpStepOne.controls; }



  onSubmitStepOne() {
    this.submitted = true;
    this.errormessage = "";
    // stop here if form is invalid
    if (this.signUpStepOne.invalid) {
      return;
    }

    //abled/disabled submit button
    this.submitted = false;
    this.isFormSubmitted = true;

    //get values from form and set to obj
    let _data = {
      phoneNo: this.signUpStepOne.value.phoneNo,
      isResend: false
    }

    //send info to the api  
    this.clientService.phoneNumberSignUp(_data).then((response: any) => {
      console.log("signUpPhoneVerification ", response)

      //<----show toast        
      this.toastService.isToastVisible.emit({ message: response.Message, success: true });
      //show toast ---->

      if (response.Succeeded) {

        localStorage.setItem('clientsigninlogs', JSON.stringify(_data));

        this.submitted = false;
        this.isFormSubmitted = false;
        this.step = 2;
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


  onSubmitStepTwo() {

    this.isFormSubmitted = true;

    //get values from form and set to obj
    this.clientSignInObj.phoneNo = this.signUpStepOne.value.phoneNo;
    this.clientSignInObj.oTP = this.phoneVerificationcode;

    //send info to the api  
    this.clientService.phoneNumberSignInConfirm(this.clientSignInObj).then((response: any) => {
      console.log("lawyerSignUpWithEmail ", response)

      //<----show toast        
      this.toastService.isToastVisible.emit({ message: response.Message, success: true });
      //show toast ---->

      if (response.Succeeded) {
        localStorage.setItem('clientsignininfo', JSON.stringify(response.Data));
        localStorage.removeItem('clientsigninlogs');
        localStorage.setItem('_B_JW_Token', response.Data.JWToken);

        setTimeout(() => {
          this.router.navigateByUrl("client/home");
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
      phoneNo: this.signUpStepOne.value.phoneNo,
      isResend: true
    }

    //send info to the api  
    this.clientService.phoneNumberSignUp(_data).then((response: any) => {
      console.log("signUpPhoneVerification ", response)

      //<----show toast        
      this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
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


  // this called every time when user changed the code
  onCodeChanged(code: any) {
    console.log(code)
  }

  // this called only if user entered full code
  onCodeCompleted(code: any) {
    console.log(code)
    this.phoneVerificationcode = code;
    this.onSubmitStepTwo();
  }
}