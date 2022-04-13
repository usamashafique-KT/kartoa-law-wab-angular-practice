import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public isToastVisible = new EventEmitter<any>();
  constructor() {
    this.isToastVisible.subscribe((resp) => {
      // console.log("isVisibleEvent", resp)
    })
  }
}

// this.toastService.isToastVisible.emit({ message: 'Successfully!', success: true });
// this.toastService.isToastVisible.emit({ message: 'Failed!', success: false });