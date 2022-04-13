import { Injectable } from '@angular/core';
import { ApiEndPointsService } from './api-end-points.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends ApiEndPointsService {

  constructor(
    private apiService: ApiService
  ) {
    super();
  }

  lawyerSignUpEmailVerification(data: any) {
    return new Promise((resolve, reject) => {
      this.apiService.post(this.endpoints.postAccountVerifyEmail, { ...data }, {}, true).subscribe({
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

  lawyerCheckConfirmEmail(data: any) {
    return new Promise((resolve, reject) => {
      this.apiService.get(this.endpoints.getAccountConfirmEmail, { ...data }, {}, true).subscribe({
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

  lawyerSignUpWithEmail(data: any) {
    return new Promise((resolve, reject) => {
      this.apiService.post(this.endpoints.postAccountLawyerSignUp, { ...data }, {}, true).subscribe({
        next: (response) => {
          console.log("POST account/LawyerSignUp :", response);
          resolve(response);
        },
        error: (e) => {
          console.error("POST account/LawyerSignUp :", e)
          reject(e)
        },
        complete: () => {
          // console.info('Completed')
        }
      });
    });
  }

  lawyerSignUpPhoneVerification(data: any) {
    return new Promise((resolve, reject) => {
      this.apiService.post(this.endpoints.postAccountVerifyPhone + `/${data.userId}?isResend=${data.isResend}`, data.phoneNo, {}, true).subscribe({
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

  lawyerSignUpPhoneVerificationCodeSend(data: any) {
    return new Promise((resolve, reject) => {
      this.apiService.post(this.endpoints.postAccountVerifyPhone + `/?isResend=${data.isResend}`, data.phoneNo, {}, true).subscribe({
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

  lawyerSignIn(data: any) {
    return new Promise((resolve, reject) => {
      this.apiService.post(this.endpoints.postAccountLawyerLogin, { ...data }, {}, true).subscribe({
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

  addLawyerSection(data: any) {
    return new Promise((resolve, reject) => {
      this.apiService.put(this.endpoints.putProfileSection, data, {}, true, true).subscribe({
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

  getLawyerSections() {
    return new Promise((resolve, reject) => {
      this.apiService.get(this.endpoints.getProfileSection, {}, {}, true, true).subscribe({
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

  addRoaster(data: any) {
    return new Promise((resolve, reject) => {
      this.apiService.post(this.endpoints.postRoster, data, {}, true, true).subscribe({
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

  getRoaster() {
    return new Promise((resolve, reject) => {
      this.apiService.get(this.endpoints.getRoster, {}, {}, true, true).subscribe({
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

  getAvailability() {
    return new Promise((resolve, reject) => {
      this.apiService.get(this.endpoints.getAvailability, {}, {}, true, true).subscribe({
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


  uploadLargeFile(data: any) {
    return new Promise((resolve, reject) => {
      this.apiService.post(this.endpoints.lawyer.fileManager.postPostlargeFile, data, {}, true, true).subscribe({
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

  GetResources(parentId: string) {
    return new Promise((resolve, reject) => {
      this.apiService.get(this.endpoints.lawyer.fileManager.getResources + `?parentId=${parentId}`, {}, {}, true, true).subscribe({
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

  getStorageUsed() {
    return new Promise((resolve, reject) => {
      this.apiService.get(this.endpoints.lawyer.fileManager.getStorageUsed, {}, {}, true, true).subscribe({
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

  getTrashedResources() {
    return new Promise((resolve, reject) => {
      this.apiService.get(this.endpoints.lawyer.fileManager.getTrashedResources, {}, {}, true, true).subscribe({
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

  getSharedResources() {
    return new Promise((resolve, reject) => {
      this.apiService.get(this.endpoints.lawyer.fileManager.getSharedResources, {}, {}, true, true).subscribe({
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

  softDelete(id: string) {
    return new Promise((resolve, reject) => {
      this.apiService.get(this.endpoints.lawyer.fileManager.getSoftDelete + `?id=${id}`, {}, {}, true, true).subscribe({
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

  deletePermanently(file: any) {
    return new Promise((resolve, reject) => {
      this.apiService.get(this.endpoints.lawyer.fileManager.getDeletePermanently + `?id=${file.Id}&type=${file.ResourceType}`, {}, {}, true, true).subscribe({
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

  restoreResource(id: string) {
    return new Promise((resolve, reject) => {
      this.apiService.get(this.endpoints.lawyer.fileManager.getRestoreResource + `?id=${id}`, {}, {}, true, true).subscribe({
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


  createFolder(data: any) {
    return new Promise((resolve, reject) => {
      this.apiService.post(this.endpoints.lawyer.fileManager.postCreateFolder, data, {}, true, true).subscribe({
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


  addClientContacts(data: any) {
    return new Promise((resolve, reject) => {
      this.apiService.post(this.endpoints.lawyer.client.postAdd, data, {}, true, true).subscribe({
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

  updateClientContacts(data: any) {
    return new Promise((resolve, reject) => {
      this.apiService.put(this.endpoints.lawyer.client.putUpdate, data, {}, true, true).subscribe({
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

  getClientContacts() {
    return new Promise((resolve, reject) => {
      this.apiService.get(this.endpoints.lawyer.client.getGetAll, {}, {}, true, true).subscribe({
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
