import { Component, EventEmitter } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { SocialAuthService } from 'angularx-social-login';
import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kartoa-law-web';
  selected = "en-US";

  private readonly publicApiKey: string = 'BMJICv1jTNb_Zj0zavi-B9W3AGHER8_AMP9pWyb55QV7vKUUo0Pm3624pbL8vHsl9pH_e8Xgf0zju7pzv_elCsU';
  private readonly privateApiKey: string = 'PzdBigdHuhJpSafGynyJvEeeF-WiM35_WSHXzPTDzGk';

  constructor(
    private apiService: ApiService,
    private swPush: SwPush,
    private swUpdate: SwUpdate
  ) { 
    this.apiService.apiLanguage.emit(this.selected);
  }

  ngOnInit() {     
    // this.pushSubscription();
    // this.swPush.messages.subscribe((message) => console.log(message));

    // this.swPush.notificationClicks.subscribe(({ action, notification }) => {
    //   console.log(JSON.stringify(action))
    //   console.log(JSON.stringify(notification))
    //   // window.open(notification.data.url);
    // });
  }

  // pushSubscription() {
  //   if (!this.swPush.isEnabled) {
  //     console.log('Notification is not enabled');
  //     return;
  //   }

  //   this.swPush
  //     .requestSubscription({
  //       serverPublicKey: this.publicApiKey,
  //     })
  //     .then((sub) => {
  //       // Make a post call to serve
  //       console.log(JSON.stringify(sub));
  //     })
  //     .catch((err) => console.log(err));
  // }

  onOptionsSelected(value: string) {
    this.apiService.apiLanguage.emit(value);
    this.selected = value;
  }
}
