import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  trashedResources: any[] = [];
  isLoadingData: boolean = false;

  constructor(
    private accountService: AccountService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    this.isLoadingData = true;
    this.accountService.getClientContacts()
      .then((response: any) => {

        console.log(response)
        if (response.Succeeded) {
          this.trashedResources = response.Data;
        }
        this.isLoadingData = false;

      }).catch((error) => {
        console.error(error)
        this.isLoadingData = false;
        //<----show toast
        this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
        //show toast ---->

      });
  }

  showEditForm(contact: any) {
    console.log(contact)
    let _data = JSON.stringify(contact);
    this.router.navigate(["lawyer/edit-contact"], { queryParams: { _data } });
  }
}
