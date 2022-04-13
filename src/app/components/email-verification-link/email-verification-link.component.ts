import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-email-verification-link',
  templateUrl: './email-verification-link.component.html',
  styleUrls: ['./email-verification-link.component.scss']
})
export class EmailVerificationLinkComponent implements OnInit {
  isRequesting: boolean = true;
  message: string;

  isVisible: boolean = false;
  success: boolean = true;
  isToastVisible: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {
    console.log("userId", this.route.snapshot.queryParams['userId'])
    console.log("code", this.route.snapshot.queryParams['code'])

  }

  ngOnInit(): void {
    let userId = this.route.snapshot.queryParams['userId'];
    let code = this.route.snapshot.queryParams['code'];

    this.accountService.lawyerCheckConfirmEmail({ userId: userId, code: code }).then((response: any) => {
      console.log("lawyerCheckConfirmEmail ", response)
      if (response.Succeeded) {
        this.message = response.Message;
        this.isToastVisible = true;
        this.isVisible = true;
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['lawyer/signup'], { queryParams: { userId: userId } });
        }, 500)
      }
      this.isRequesting = false;

    }).catch((error) => {
      this.message = "Invalid email verification link. Try Again."
      this.isRequesting = false;
      console.error(error)

    });
  }

}
