import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {


  constructor(
    private router: Router,
    private userService: UserService
  ) {


  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {


    console.log(state.url)

    if (state.url.includes("client")) {
      console.log('client')

      var _signInUser = JSON.parse(localStorage.getItem('clientsignininfo') || 'null');

      if (_signInUser) {
        return true;
      }
      else {
        this.router.navigate(['client/signin'], { queryParams: { returnUrl: state.url } });
        return false;
      }

    } else if (state.url.includes("lawyer")) {
      console.log('lawyer')

      var _signInUser = JSON.parse(localStorage.getItem('lawyersignininfo') || 'null');

      if (_signInUser) {
        return true;
      }
      else {
        this.router.navigate(['lawyer/signin'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    } else {
      console.log('else')
    }



    // return this.socialAuthService.isUserAuthenticated.pipe(
    //   map((socialUser: SocialUser) => !!socialUser),
    //   tap((isLoggedIn: boolean) => {
    //     console.log("canActivate", isLoggedIn)
    //     if (!isLoggedIn) {
    //       console.log("signin")
    //       this.router.navigateByUrl("signin");
    //     }
    //   })
    // );
    return true;
  }
}



