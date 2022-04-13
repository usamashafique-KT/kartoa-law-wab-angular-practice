import { Injectable } from '@angular/core';
import { ApiEndPointsService } from './api-end-points.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CityService extends ApiEndPointsService {


  constructor(
    private apiService: ApiService
  ) {
    super();
  }

  gets() {
    return new Promise((resolve, reject) => {
      this.apiService.get(this.endpoints.getCityGet).subscribe({
        next: (response) => {
          // console.log("GET CITIES :", response);
          resolve(response);
        },
        error: (e) => {
          // console.error("GET City/Get :", e)
          reject(e)
        },
        complete: () => {
          // console.info('GET City/Get Completed')
        }
      });
    });
  }

  get() {

  }

  add() {

  }

  edit() {

  }

  delete() {

  }
}
