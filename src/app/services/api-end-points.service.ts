import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ApiEndPointsService {

  protected readonly endpoints = {
    getCityGet: 'City/Get',
    postAccountVerifyEmail: 'Account/VerifyEmail',
    getAccountConfirmEmail: 'Account/ConfirmEmail',
    postAccountLawyerSignUp: 'Account/LawyerSignUp',
    postAccountClientSignup: 'Account/ClientSignup',
    postAccountVerifyPhone: 'Account/VerifyPhone',
    postAccountLawyerLogin: 'Account/LawyerLogin',
    postAccountClientLogin: 'Account/ClientLogin',
    putProfileSection: 'Profile/update/Section',
    getProfileSection: 'Profile/GetAllSections',
    postRoster: 'Roster/Add',
    getRoster: 'Roster/Get',
    getAvailability: 'Roster/GetAvailability',

    lawyer: {
      fileManager: {
        postCreateFolder: 'FileManager/CreateFolder',
        getResources: 'FileManager/GetResources',
        getStorageUsed: 'FileManager/GetStorageUsed',
        getTrashedResources: 'FileManager/GetTrashedResources',
        getSharedResources: 'FileManager/GetSharedResources',
        getSoftDelete: 'FileManager/SoftDelete',
        getDeletePermanently: 'FileManager/DeletePermanently',
        getRestoreResource: 'FileManager/RestoreResource',
        postPostlargeFile: 'FileManager/PostlargeFile',
      },
      client: {
        getGetAll: 'Client/GetAll',
        postAdd: 'Client/add',
        putUpdate: 'Client/Update',
      }
    }
  };

  constructor() { }
}
