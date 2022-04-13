import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  isFormSubmitted = false;
  submitted = false;

  privacies: any[] = [
    { label: 'Public', value: 1 },
    { label: 'Private', value: 2 }
  ];

  alreadyEnteredType = false;
  addressTypeCopy: any[];
  addressType: any[] = [
    { label: 'Home', value: "1" },
    { label: 'Office', value: "2" },
    { label: 'Other', value: "3" }
  ];


  contactSection = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required]
    }),
    firstName: new FormControl('', {
      validators: [Validators.required]
    }),
    lastName: new FormControl('', {
      validators: [Validators.required]
    }),
    phones: new FormArray([
    ]),
    emails: new FormArray([
    ]),
    works: new FormArray([
    ]),
    addresses: new FormArray([
    ]),
    Tags: new FormControl('', {
      validators: [Validators.required]
    })
  });

  public editContactInfo: any;
  public isEditContactInfo: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private toastService: ToastService,
  ) {

    try {
      this.editContactInfo = JSON.parse(this.activatedRoute.snapshot.queryParams._data);

      if (this.editContactInfo) {
        this.isEditContactInfo = true;
        console.log(this.editContactInfo)

        this.editContactInfo.Phones.map(
          (element: any) => {
            const actorsForm = this.fb.group({
              type: new FormControl(element.Type, {
                validators: [Validators.required]
              }),
              value: new FormControl(element.Value, {
                validators: [Validators.required]
              })
            });

            this.phones().push(actorsForm);
          }
        );

        this.editContactInfo.Emails.map(
          (element: any, index: number) => {
            const actorsForm = this.fb.group({
              isPrimary: new FormControl(element.IsPrimary ? index : -1),
              email: new FormControl(element.Email, {
                validators: [Validators.required]
              })
            });
            console.log()
            this.emails().push(actorsForm);
          }
        );

        this.editContactInfo.Works.map(
          (element: any) => {
            const actorsForm = this.fb.group({
              compnayName: new FormControl(element.CompnayName, {
                validators: [Validators.required]
              }),
              jobTitle: new FormControl(element.JobTitle, {
                validators: [Validators.required]
              })
            });

            this.works().push(actorsForm);
          }
        );

        this.editContactInfo.Addresses.map(
          (element: any) => {
            const actorsForm = this.fb.group({
              Type: new FormControl(element.Type, {
                validators: [Validators.required]
              }),
              Street: new FormControl(element.Street, {
                validators: [Validators.required]
              }),
              City: new FormControl(element.City, {
                validators: [Validators.required]
              }),
              State: new FormControl(element.State, {
                validators: [Validators.required]
              }),
              Country: new FormControl(element.Country, {
                validators: [Validators.required]
              }),
              PostalCode: new FormControl(element.PostalCode, {
                validators: [Validators.required]
              }),
              Privacy: new FormControl(element.Privacy, {
                validators: [Validators.required]
              }),
            });

            this.addresses().push(actorsForm);
          }
        );

        this.contactSection.patchValue({
          title: this.editContactInfo.Title,
          firstName: this.editContactInfo.FirstName,
          lastName: this.editContactInfo.LastName,
          Tags: this.editContactInfo.Tags,
        });

      }
    } catch (error) {
      console.log(error)
    }
  }

  ngOnInit(): void {
    this.addressTypeCopy = this.addressType;

    // this.onRadioChange(0)
  }

  get one() { return this.contactSection.controls; }

  phones(): FormArray {
    return this.contactSection.get('phones') as FormArray;
  }

  newPhone(type: string = '', value: string = ''): FormGroup {
    return this.fb.group({
      type: new FormControl(type, {
        validators: [Validators.required]
      }),
      value: new FormControl(value, {
        validators: [Validators.required]
      })
    });
  }

  addPhone(type: string = '', value: string = '') {
    this.phones().push(this.newPhone(type, value));
  }

  removePhone(empIndex: number) {
    console.log(empIndex)
    this.phones().removeAt(empIndex);
  }

  emails(): FormArray {
    return this.contactSection.get('emails') as FormArray;
  }

  newEmails(isPrimary: string = '', email: string = ''): FormGroup {
    return this.fb.group({
      isPrimary: new FormControl(isPrimary),
      email: new FormControl(email, {
        validators: [Validators.required]
      })
    });
  }

  addNewEmail() {
    this.emails().push(this.newEmails());
  }

  removeEmail(empIndex: number) {
    console.log(empIndex)
    this.emails().removeAt(empIndex);
  }

  onRadioChange(index: any) {
    console.log(index);
    // this.emails().controls.isPrimary = true;
    console.log(this.emails().value);
    this.emails().value.map((e: any) => {
      e.isPrimary = false;
    });
    console.log(this.emails().value);
    this.emails().value[index].isPrimary = true;
    console.log(this.emails().value);
  }

  works(): FormArray {
    return this.contactSection.get('works') as FormArray;
  }

  newWorks(): FormGroup {
    return this.fb.group({
      compnayName: new FormControl('', {
        validators: [Validators.required]
      }),
      jobTitle: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  addNewWork() {
    this.works().push(this.newWorks());
  }

  removeWork(empIndex: number) {
    console.log(empIndex)
    this.works().removeAt(empIndex);
  }

  addresses(): FormArray {
    return this.contactSection.get('addresses') as FormArray;
  }

  newAddress(): FormGroup {
    return this.fb.group({
      Type: new FormControl('', {
        validators: [Validators.required]
      }),
      Street: new FormControl('', {
        validators: [Validators.required]
      }),
      City: new FormControl('', {
        validators: [Validators.required]
      }),
      State: new FormControl('', {
        validators: [Validators.required]
      }),
      Country: new FormControl('', {
        validators: [Validators.required]
      }),
      PostalCode: new FormControl('', {
        validators: [Validators.required]
      }),
      Privacy: new FormControl(this.privacies[1].value, {
        validators: [Validators.required]
      })
    });
  }

  addNewAddress() {
    this.addresses().push(this.newAddress());
    // let length = this.contactSection.value.addresses.length;
    // console.log(length)
    // console.log(this.contactSection.value.addresses[length - 2].Type)
    // this.addressTypeCopy = this.addressTypeCopy.filter(x => x.value != this.contactSection.value.addresses[length - 2].Type);
  }

  removeAddress(empIndex: number) {
    console.log(empIndex)
    this.addresses().removeAt(empIndex);

    // let _data = this.addressType.filter(x => x.value == this.contactSection.value.addresses[empIndex].Type.value)[0];
    // this.addressTypeCopy.push(_data);
  }

  onSubmitSaveContact() {
    console.log(this.contactSection.value);

    this.submitted = true;

    // stop here if form is invalid
    if (this.contactSection.invalid) {
      return;
    }

    if (this.contactSection.value.emails.length == 1) {
      this.contactSection.value.emails[0].isPrimary = true;
    } else {
      this.contactSection.value.emails.map((e: any) => {
        if (e.isPrimary == '') {
          e.isPrimary = false;
        }
      })
    }

    this.contactSection.value.phones.map((e: any) => {
      e.type.toString();
    })

    this.contactSection.value.Tags.toString()


    if (this.isEditContactInfo) {
      this.editContactInfo.Title = this.contactSection.value.title;
      this.editContactInfo.FirstName = this.contactSection.value.firstName;
      this.editContactInfo.LastName = this.contactSection.value.lastName;
      this.editContactInfo.Phones = this.contactSection.value.phones;
      this.editContactInfo.Emails = this.contactSection.value.emails;
      this.editContactInfo.Works = this.contactSection.value.works;
      this.editContactInfo.Addresses = this.contactSection.value.addresses;
      this.editContactInfo.Tags = this.contactSection.value.Tags


      this.accountService.updateClientContacts(this.editContactInfo)
        .then((response: any) => {

          //<----show toast
          this.toastService.isToastVisible.emit({ message: response.Message, success: response.Succeeded });
          //show toast ---->

          this.submitted = false;
          this.isFormSubmitted = false;

          this.router.navigateByUrl("lawyer/contacts");
        }).catch((error) => {

          this.isFormSubmitted = false;
          this.submitted = false;
          console.error(error)

          //<----show toast
          this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
          //show toast ---->

        });
    } else {
      this.accountService.addClientContacts(this.contactSection.value)
        .then((response: any) => {

          //<----show toast
          this.toastService.isToastVisible.emit({ message: response.Message, success: response.Succeeded });
          //show toast ---->

          this.submitted = false;
          this.isFormSubmitted = false;

        }).catch((error) => {

          this.isFormSubmitted = false;
          this.submitted = false;
          console.error(error)

          //<----show toast
          this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
          //show toast ---->

        });
    }
  }
}
