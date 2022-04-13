import { Injectable } from '@angular/core';
import { IClientSignUp } from '../interfaces/iclient-sign-up';
import { ApiEndPointsService } from './api-end-points.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends ApiEndPointsService {
  constructor(
    private apiService: ApiService
  ) {
    super();
  }

  phoneNumberSignUp(data: any) {
    return new Promise((resolve, reject) => {
      this.apiService.post(this.endpoints.postAccountVerifyPhone + `?isResend=${data.isResend}`, data.phoneNo, {}, true).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (e) => {
          reject(e)
        },
        complete: () => {
          // console.info('Completed')
        }
      });
    });
  }

  phoneNumberSignUpConfirm(data: IClientSignUp) {
    return new Promise((resolve, reject) => {
      this.apiService.post(this.endpoints.postAccountClientSignup, { ...data }, {}, true).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (e) => {
          reject(e)
        },
        complete: () => {
          // console.info('Completed')
        }
      });
    });
  }

  phoneNumberSignInConfirm(data: any) {
    return new Promise((resolve, reject) => {
      this.apiService.post(this.endpoints.postAccountClientLogin, { ...data }, {}, true).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (e) => {
          reject(e)
        },
        complete: () => {
          // console.info('Completed')
        }
      });
    });
  }
}
