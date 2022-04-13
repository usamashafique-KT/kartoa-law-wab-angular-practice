import { Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  message = 'myToastmyToast';
  success: boolean = false;

  constructor(
    public toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.toastService.isToastVisible.subscribe((resp) => {
      // console.log("isVisibleEvent", resp)
      this.message = resp.message;
      this.success = resp.success;
      this.show();
    })
  }

  show() {
    var toastLiveExample = document.getElementById('liveToast') || '';
    var toast = new bootstrap.Toast(toastLiveExample)
    toast.show()

  }

}

// // var toastTrigger = document.getElementById('liveToastBtn');
// var toastLiveExample = document.getElementById('liveToast') || '';
// // if (toastTrigger) {
// // toastTrigger.addEventListener('click', function () {
// var toast = new bootstrap.Toast(toastLiveExample)

// toast.show()
// // })
// // }

// <app-toast [message]="message" [isVisible]="" [success]=""></app-toast>