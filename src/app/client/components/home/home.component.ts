import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
   
  ) { }

  ngOnInit(): void {


  }

  signOut() {
    localStorage.removeItem('lawyersignupinfo');
    localStorage.removeItem('lawyerSignIninfo');
    localStorage.removeItem('_B_JW_Token');
  }

}
