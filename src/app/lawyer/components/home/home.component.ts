import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  files: File[] = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private clientService: ClientService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {


  }

  uploadFile() {
    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) {
      formData.append("fileUpload", this.files[i]);
    }

    this.http.post('https://localhost:7198/en-US/api/FileManager/UploadFiles', formData)
      .subscribe(event => {
        console.log(event);
      });
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  signOut() {
    localStorage.removeItem('lawyersignininfo');
    localStorage.removeItem('lawyersignupinfo');
    localStorage.removeItem('_B_JW_Token');
    this.router.navigateByUrl("lawyer/signin");
  }

}
