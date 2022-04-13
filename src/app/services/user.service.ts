import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isUserAuthenticated = new EventEmitter<any>();
  // public isAuthenticated: boolean;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {
    this.isUserAuthenticated.subscribe((data) => {
      console.log(data)
      if (data) {
        // this.isAuthenticated = true
      }
    });
  }


  signUpEmailCheck(email: string) {
    return new Promise((resolve, reject) => {
      this.apiService.post('user/signupemailcheck', { email: email }, {}).subscribe({
        next: (response) => {
          // console.log("post :", response);
          resolve(response);
        },
        error: (e) => {
          // console.error(e)
          reject(e)
        },
        complete: () => {
          console.info('complete')
        }
      });
    });
  }



  signUp(data: any, source?: string) {

    return new Promise((resolve, reject) => {
      this.apiService.post('user/signup', data, {}).subscribe({
        next: (response) => {
          // console.log("post :", response);
          resolve(response);
        },
        error: (e) => {
          // console.error(e)
          reject(e)
        },
        complete: () => {
          console.info('complete')
        }
      });
    });
  }


  signIn(data: any) {
    return new Promise((resolve, reject) => {
      this.apiService.post('user/signin', data, {}).subscribe({
        next: (response) => {
          // console.log("post :", response);
          resolve(response);
        },
        error: (e) => {
          // console.error(e)
          reject(e)
        },
        complete: () => {
          console.info('complete')
        }
      });
    });
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      this.apiService.get('user', {}).subscribe({
        next: (response) => {
          // console.log("post :", response);
          resolve(response);
        },
        error: (e) => {
          // console.error(e)
          reject(e)
        },
        complete: () => {
          console.info('complete')
        }
      });
    });
  }
}

 // return new Promise((resolve, reject) => {
    //   this.apiService.post('user/signin', data, {}).subscribe((response) => {
    //     console.log("post :", response);
    //   }, (error) => {
    //     console.error("post :", error);
    //   });
    // });