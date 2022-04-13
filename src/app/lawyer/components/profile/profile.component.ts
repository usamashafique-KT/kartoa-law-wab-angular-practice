import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { ClientService } from 'src/app/services/client.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('closeDialogBox') closeDialogBox: ElementRef;

  lawyerProfileSections: any;

  submitted = false;
  alreadyEnteredType = false;
  isFormSubmitted = false;

  displayBasic: boolean;
  modalTitle: string = "Title";
  openSection: number;

  privacies: any[] = [
    { label: 'Public', value: 1 },
    { label: 'Private', value: 2 }
  ];

  addressTypeCopy: any[];
  addressType: any[] = [
    { label: 'Home', value: 1 },
    { label: 'Office', value: 2 },
    { label: 'Other', value: 3 }
  ];

  socialListCopy: any[];
  socialList: any[] = [
    { label: 'Facebook', value: 1 },
    { label: 'Twitter', value: 2 },
    { label: 'Instagram', value: 3 },
    { label: 'LinkedIn', value: 4 },
  ];

  areaOfLawlListCopy: any[];
  public areaOfLawlList: any[] = [
    { label: 'Public law', value: 1 },
    { label: 'Tax law', value: 2 },
    { label: 'Criminal law', value: 3 },
    { label: 'Sports Law', value: 4 }
  ];

  addresses: any[] = [];
  services: any[] = [];
  socials: any[] = [];
  // privacy: string;

  servicesFees: any[] = [];
  areaOfLawlSelectedListCopy: any[] = [];
  areaOfLawlSelectedServicesFee: string[] = [];

  //SectionId = 1
  aboutUsSection = new FormGroup({
    Privacy: new FormControl(this.privacies[1].value, {
      validators: [Validators.required]
    }),
    Text: new FormControl('', {
      validators: [Validators.required]
    })
  });

  //SectionId = 2
  experienceSection = new FormGroup({
    Privacy: new FormControl(this.privacies[1].value, {
      validators: [Validators.required]
    }),
    Description: new FormControl('', {
      validators: [Validators.required]
    })
  });

  //SectionId = 3
  languagesSection = new FormGroup({
    Privacy: new FormControl(this.privacies[1].value, {
      validators: [Validators.required]
    }),
    Languages: new FormControl('', {
      validators: [Validators.required]
    })
  });

  //SectionId = 4
  socialMediaSection = new FormGroup({
    Type: new FormControl(this.socialList[0].value, {
      validators: [Validators.required]
    }),
    Url: new FormControl('', {
      validators: [Validators.required]
    }),
    Privacy: new FormControl(this.privacies[0].value, {
      validators: [Validators.required]
    }),
  });

  //SectionId = 5
  serviceSection = new FormGroup({
    AreaOfLaw: new FormControl(this.areaOfLawlList[0].value, {
      validators: [Validators.required]
    }),
    Service: new FormControl('', {
      validators: [Validators.required]
    }),
    Privacy: new FormControl(this.privacies[0].value, {
      validators: [Validators.required]
    }),
  });

  //SectionId = 6
  consultationModeSection = new FormGroup({
    Privacy: new FormControl(this.privacies[1].value, {
      validators: [Validators.required]
    }),
    Mode: new FormControl('', {
      validators: [Validators.required]
    })
  });

  //SectionId = 7
  addressSection = new FormGroup({
    Type: new FormControl(this.addressType[0].value, {
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
    }),
  });

  //SectionId = 8
  titleSection = new FormGroup({
    Privacy: new FormControl(this.privacies[1].value, {
      validators: [Validators.required]
    }),
    Title: new FormControl('', {
      validators: [Validators.required]
    })
  });

  //SectionId = 9
  videoIntroSection = new FormGroup({
    Privacy: new FormControl(this.privacies[1].value, {
      validators: [Validators.required]
    }),
    Source: new FormControl('', {
      validators: [Validators.required]
    })
  });

  //SectionId = 10
  qualificationSection = new FormGroup({
    Privacy: new FormControl(this.privacies[1].value, {
      validators: [Validators.required]
    }),
    Data: new FormControl('', {
      validators: [Validators.required]
    })
  });

  //SectionId = 11
  feeSection = new FormGroup({
    AreaOfLaw: new FormControl(this.areaOfLawlList[0].value, {
      validators: [Validators.required]
    }),
    Service: new FormControl('', {
      validators: [Validators.required]
    }),
    Type: new FormControl('fixed', {
      validators: [Validators.required]
    }),
    Charges: new FormControl(0, {
      validators: [Validators.required]
    }),
    Privacy: new FormControl(this.privacies[1].value, {
      validators: [Validators.required]
    }),
  });

  selectedareaOfLawServices: any[] = [];

  files: File[] = [];

  constructor(
    private clientService: ClientService,
    private toastService: ToastService,
    private accountService: AccountService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // this.getLawyerSections();
    this.areaOfLawlListCopy = this.areaOfLawlList;
    this.addressTypeCopy = this.addressType;
    this.socialListCopy = this.socialList;

  }

  showBasicDialog(action: number, title: string) {
    this.modalTitle = title;
    this.openSection = action;
    this.displayBasic = true;
  }

  get one() { return this.aboutUsSection.controls; }

  onSubmitAboutUs() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.aboutUsSection.invalid) {
      return;
    }


    this.isFormSubmitted = true;

    this.lawyerProfileSections.AboutUs = {
      Text: this.aboutUsSection.value.Text,
      Privacy: this.aboutUsSection.value.Privacy
    }

    this.addLawyerSection(1, this.lawyerProfileSections.AboutUs);

  }

  get exp() { return this.experienceSection.controls; }

  onSubmitExperience() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.experienceSection.invalid) {
      return;
    }

    this.isFormSubmitted = true;

    this.lawyerProfileSections.Experience = {
      Description: this.experienceSection.value.Description,
      Privacy: this.experienceSection.value.Privacy
    }

    this.addLawyerSection(2, this.lawyerProfileSections.Experience);

  }

  get lang() { return this.languagesSection.controls; }

  onSubmitLanguages() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.languagesSection.invalid) {
      return;
    }

    this.isFormSubmitted = true;

    this.lawyerProfileSections.Languages = {
      Languages: this.languagesSection.value.Languages,
      privacy: this.languagesSection.value.Privacy
    }

    this.addLawyerSection(3, this.lawyerProfileSections.Languages);
  }

  get addr() { return this.addressSection.controls; }

  onSubmitAddress() {
    this.alreadyEnteredType = false;

    if (this.addresses.filter(x => x.Type == this.addressSection.value.Type).length > 0) {
      this.alreadyEnteredType = true;
      // this.toastService.isToastVisible.emit({ message: 'This Address type is already entered', success: false });
      return;
    }

    this.submitted = true;

    // stop here if form is invalid
    if (this.addressSection.invalid) {
      return;
    }

    // this.isFormSubmitted = true;

    let address = {
      Type: this.addressSection.value.Type,
      Street: this.addressSection.value.Street,
      City: this.addressSection.value.City,
      State: this.addressSection.value.State,
      Country: this.addressSection.value.Country,
      PostalCode: this.addressSection.value.PostalCode,
      Privacy: this.addressSection.value.Privacy
    };

    this.addressTypeCopy = this.addressTypeCopy.filter(x => x.value != this.addressSection.value.Type);

    this.addresses.push(address)
    this.submitted = false;
    this.addressSection.reset();
  }

  confirmAddressAdd() {
    this.isFormSubmitted = true;

    this.lawyerProfileSections.Addresses = this.addresses;

    this.addLawyerSection(7, this.lawyerProfileSections.Addresses);
  }

  removeAddress(i: any, type: any) {
    this.addresses.splice(i, 1)
    let _data = this.addressType.filter(x => x.value == type)[0];
    this.addressTypeCopy.push(_data);
  }

  showAddressType(i: any) {
    return this.addressType.filter(x => x.value == i)[0].label;
  }

  get conMode() { return this.consultationModeSection.controls; }

  onSubmitConsultationMode() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.consultationModeSection.invalid) {
      return;
    }

    this.isFormSubmitted = true;

    this.lawyerProfileSections.ConsultationMode = {
      Mode: this.consultationModeSection.value.Mode,
      Privacy: this.consultationModeSection.value.Privacy
    }

    this.addLawyerSection(6, this.lawyerProfileSections.ConsultationMode);
  }

  get socialControls() { return this.socialMediaSection.controls; }

  removeSocial(i: any, type: any) {
    this.socials.splice(i, 1)
    let _data = this.socialList.filter(x => x.value == type)[0];
    this.socialListCopy.push(_data);
  }

  onSubmitSocialMedia() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.socialMediaSection.invalid) {
      return;
    }

    let social = {
      Type: this.socialMediaSection.value.Type,
      Url: this.socialMediaSection.value.Url,
      Privacy: this.socialMediaSection.value.Privacy
    }

    this.socialListCopy = this.socialListCopy.filter(x => x.value != this.socialMediaSection.value.Type);

    this.socials.push(social)
    this.submitted = false;
    this.socialMediaSection.reset();
  }

  confirmSocialsAdd() {
    this.isFormSubmitted = true;
    this.lawyerProfileSections.SocialMedia = this.socials;
    this.addLawyerSection(4, this.lawyerProfileSections.SocialMedia);
  }

  removeService(i: any, areaOfLaw: any) {
    this.services.splice(i, 1)
    let _data = this.areaOfLawlList.filter(x => x.value == areaOfLaw)[0];
    this.areaOfLawlListCopy.push(_data);
  }

  showAreaOfLaw(i: any) {
    return this.areaOfLawlList.filter(x => x.value == i)[0].label;
  }

  showSocialType(i: any) {
    return this.socialList.filter(x => x.value == i)[0].label;
  }


  get serviceControls() { return this.serviceSection.controls; }

  onSubmitServices() {

    if (this.services.filter(x => x.AreaOfLaw == this.serviceSection.value.AreaOfLaw).length > 0) {
      // this.toastService.isToastVisible.emit({ message: 'This Address type is already entered', success: false });
      return;
    }

    this.submitted = true;

    // stop here if form is invalid
    if (this.serviceSection.invalid) {
      return;
    }

    // this.isFormSubmitted = true;

    let service = {
      AreaOfLaw: this.serviceSection.value.AreaOfLaw,
      Service: this.serviceSection.value.Service,
      Privacy: this.serviceSection.value.Privacy
    }

    this.areaOfLawlListCopy = this.areaOfLawlListCopy.filter(x => x.value != this.serviceSection.value.AreaOfLaw);

    this.services.push(service)
    this.submitted = false;
    this.serviceSection.reset();
  }

  confirmServiceAdd() {
    this.isFormSubmitted = true;
    this.lawyerProfileSections.Services = this.services;
    this.addLawyerSection(5, this.lawyerProfileSections.Services);
  }

  get titleControls() { return this.titleSection.controls; }

  onSubmitTitle() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.titleSection.invalid) {
      return;
    }

    this.isFormSubmitted = true;

    this.lawyerProfileSections.JobTitle = {
      Title: this.titleSection.value.Title,
      Privacy: this.titleSection.value.Privacy
    }

    this.addLawyerSection(8, this.lawyerProfileSections.JobTitle);

  }

  get videoControls() { return this.videoIntroSection.controls; }

  onSubmitVideoIntro() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.videoIntroSection.invalid) {
      return;
    }

    this.isFormSubmitted = true;

    this.lawyerProfileSections.VideoIntro = {
      Source: this.videoIntroSection.value.Source,
      Privacy: this.videoIntroSection.value.Privacy
    }

    this.addLawyerSection(9, this.lawyerProfileSections.VideoIntro);
  }

  get qualificationControls() { return this.qualificationSection.controls; }

  onSubmitQualification() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.qualificationSection.invalid) {
      return;
    }

    this.isFormSubmitted = true;

    this.lawyerProfileSections.Qualification = {
      Data: this.qualificationSection.value.Data,
      Privacy: this.qualificationSection.value.Privacy
    }

    this.addLawyerSection(10, this.lawyerProfileSections.Qualification);
  }

  get feeControls() { return this.feeSection.controls; }

  feeAreaOfLawChange(event: any) {
    this.feeSection.setValue({
      AreaOfLaw: event.value,
      Service: '',
      Type: 'fixed',
      Charges: 0,
      Privacy: this.privacies[1].value
    });
    // this.lawyerSelectedServices.forEach((x) => {

    //   let _data = this.areaOfLawlList.filter(z => z.value == x.areaOfLaw)[0];
    //   this.areaOfLawlSelectedListCopy.push(_data);
    // })

    let __data = this.lawyerProfileSections.Services.filter((z: any) => z.AreaOfLaw == event.value)[0].Service;
    this.areaOfLawlSelectedServicesFee = __data;

  }

  onSubmitFee() {

    if (this.servicesFees.filter(x => x.AreaOfLaw == this.feeSection.value.AreaOfLaw && x.Service == this.feeSection.value.Service).length > 0) {
      this.toastService.isToastVisible.emit({ message: 'This Area of law and service is already entered', success: false });
      return;
    }

    this.submitted = true;

    // // stop here if form is invalid
    if (this.feeSection.invalid) {
      return;
    }

    let fees = {
      AreaOfLaw: this.feeSection.value.AreaOfLaw,
      Service: this.feeSection.value.Service,
      Type: this.feeSection.value.Type,
      Charges: this.feeSection.value.Charges,
      Privacy: this.feeSection.value.Privacy
    };

    this.servicesFees.push(fees)
    this.submitted = false;
  }

  confirmServicesFeeAdd() {
    this.isFormSubmitted = true;
    this.lawyerProfileSections.ServicesFee = this.servicesFees;
    this.addLawyerSection(11, this.lawyerProfileSections.ServicesFee);
  }

  addLawyerSection(sectionId: number, data: any) {
    let _data = {
      sectionId: sectionId,
      data: JSON.stringify(data)
    }

    this.accountService.addLawyerSection(_data)
      .then((response: any) => {

        //<----show toast
        this.toastService.isToastVisible.emit({ message: response.Message, success: response.Succeeded });
        //show toast ---->

        this.submitted = false;
        this.isFormSubmitted = false;
        this.displayBasic = false;
      }).catch((error) => {
        //this.aboutUsSection.reset();
        this.isFormSubmitted = false;
        this.submitted = false;
        console.error(error)

        //<----show toast
        this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
        //show toast ---->

      });
  }

  getLawyerSections() {
    this.accountService.getLawyerSections()
      .then((response: any) => {

        if (response.Succeeded) {
          this.lawyerProfileSections = response.Data;

          // AboutUs
          if (this.lawyerProfileSections.AboutUs) {
            this.aboutUsSection.setValue({
              Text: this.lawyerProfileSections.AboutUs.Text,
              Privacy: this.lawyerProfileSections.AboutUs.Privacy
            })
          }

          // Experience
          if (this.lawyerProfileSections.Experience) {
            this.experienceSection.setValue({
              Description: this.lawyerProfileSections.Experience.Description,
              Privacy: this.lawyerProfileSections.Experience.Privacy
            })
          }

          //Languages
          if (this.lawyerProfileSections.Languages) {
            this.languagesSection.setValue({
              Languages: this.lawyerProfileSections.Languages.Languages,
              Privacy: this.lawyerProfileSections.Languages.Privacy
            })
          }

          //SocialMedia
          if (this.lawyerProfileSections.SocialMedia.length > 0) {

            this.socials = this.lawyerProfileSections.SocialMedia;
            this.socials.forEach((item) => {
              this.socialListCopy = this.socialListCopy.filter(x => x.value != item.Type);
            });

          }

          //Services
          if (this.lawyerProfileSections.Services.length > 0) {

            this.services = this.lawyerProfileSections.Services;

            this.services.forEach((item) => {
              this.areaOfLawlListCopy = this.areaOfLawlListCopy.filter(x => x.value != item.AreaOfLaw);
            });
          }

          //ConsultationMode
          if (this.lawyerProfileSections.ConsultationMode) {
            this.consultationModeSection.setValue({
              Mode: this.lawyerProfileSections.ConsultationMode.Mode,
              Privacy: this.lawyerProfileSections.ConsultationMode.Privacy
            })
          }

          //Addresses
          if (this.lawyerProfileSections.Addresses.length > 0) {

            this.addresses = this.lawyerProfileSections.Addresses

            this.addresses.forEach((item) => {
              this.addressTypeCopy = this.addressTypeCopy.filter(x => x.value != item.Type);
            });
          }



          //VideoIntro
          if (this.lawyerProfileSections.VideoIntro) {
            this.videoIntroSection.setValue({
              Source: this.lawyerProfileSections.VideoIntro.Source,
              Privacy: this.lawyerProfileSections.VideoIntro.Privacy
            })
          }

          //Qualification
          if (this.lawyerProfileSections.Qualification) {
            this.qualificationSection.setValue({
              Data: this.lawyerProfileSections.Qualification.Data,
              Privacy: this.lawyerProfileSections.Qualification.Privacy
            })
          }

          //JobTitle
          if (this.lawyerProfileSections.JobTitle) {
            this.titleSection.setValue({
              Title: this.lawyerProfileSections.JobTitle.Title,
              Privacy: this.lawyerProfileSections.JobTitle.Privacy
            })
          }

          //ServicesFee
          if (this.lawyerProfileSections.ServicesFee.length > 0) {

            this.servicesFees = this.lawyerProfileSections.ServicesFee;

            this.lawyerProfileSections.Services.forEach((x: any) => {

              let _data = this.areaOfLawlList.filter(z => z.value == x.AreaOfLaw)[0];
              this.areaOfLawlSelectedListCopy.push(_data);
            })

            let __data = this.lawyerProfileSections.Services.filter((z: any) => z.AreaOfLaw == this.feeSection.value.AreaOfLaw)[0].Service;

            this.areaOfLawlSelectedServicesFee = __data;
          }

        } else {

        }
      }).catch((error) => {

        console.error(error)

        //<----show toast
        this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
        //show toast ---->

      });
  }
}
