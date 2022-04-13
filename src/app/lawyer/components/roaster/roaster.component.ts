import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { ClientService } from 'src/app/services/client.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-roaster',
  templateUrl: './roaster.component.html',
  styleUrls: ['./roaster.component.scss']
})
export class RoasterComponent implements OnInit {

  submitted = false;
  roasterFormGroup = new FormGroup({

    Monday: new FormGroup({
      day: new FormControl('', {
        validators: [Validators.required]
      }),
      startTime: new FormControl('', {
        validators: [Validators.required]
      }),
      endTime: new FormControl('', {
        validators: [Validators.required]
      }),
      areaOfLaw: new FormControl('', {
        validators: [Validators.required]
      }),
      services: new FormControl([], {
        validators: [Validators.required]
      }),
      type: new FormControl('', {
        validators: [Validators.required]
      }),
      location: new FormControl('', {
        validators: [Validators.required]
      })
    }),

    Tuesday: new FormGroup({
      day: new FormControl('', {
        validators: [Validators.required]
      }),
      startTime: new FormControl('', {
        validators: [Validators.required]
      }),
      endTime: new FormControl('', {
        validators: [Validators.required]
      }),
      areaOfLaw: new FormControl('', {
        validators: [Validators.required]
      }),
      services: new FormControl([], {
        validators: [Validators.required]
      }),
      type: new FormControl('', {
        validators: [Validators.required]
      }),
      location: new FormControl('', {
        validators: [Validators.required]
      })
    }),

    Wednesday: new FormGroup({
      day: new FormControl('', {
        validators: [Validators.required]
      }),
      startTime: new FormControl('', {
        validators: [Validators.required]
      }),
      endTime: new FormControl('', {
        validators: [Validators.required]
      }),
      areaOfLaw: new FormControl('', {
        validators: [Validators.required]
      }),
      services: new FormControl([], {
        validators: [Validators.required]
      }),
      type: new FormControl('', {
        validators: [Validators.required]
      }),
      location: new FormControl('', {
        validators: [Validators.required]
      })
    }),

    Thursday: new FormGroup({
      day: new FormControl('', {
        validators: [Validators.required]
      }),
      startTime: new FormControl('', {
        validators: [Validators.required]
      }),
      endTime: new FormControl('', {
        validators: [Validators.required]
      }),
      areaOfLaw: new FormControl('', {
        validators: [Validators.required]
      }),
      services: new FormControl([], {
        validators: [Validators.required]
      }),
      type: new FormControl('', {
        validators: [Validators.required]
      }),
      location: new FormControl('', {
        validators: [Validators.required]
      })
    }),

    Friday: new FormGroup({
      day: new FormControl('', {
        validators: [Validators.required]
      }),
      startTime: new FormControl('', {
        validators: [Validators.required]
      }),
      endTime: new FormControl('', {
        validators: [Validators.required]
      }),
      areaOfLaw: new FormControl('', {
        validators: [Validators.required]
      }),
      services: new FormControl([], {
        validators: [Validators.required]
      }),
      type: new FormControl('', {
        validators: [Validators.required]
      }),
      location: new FormControl('', {
        validators: [Validators.required]
      })
    }),

    Saturday: new FormGroup({
      day: new FormControl('', {
        validators: [Validators.required]
      }),
      startTime: new FormControl('', {
        validators: [Validators.required]
      }),
      endTime: new FormControl('', {
        validators: [Validators.required]
      }),
      areaOfLaw: new FormControl('', {
        validators: [Validators.required]
      }),
      services: new FormControl([], {
        validators: [Validators.required]
      }),
      type: new FormControl('', {
        validators: [Validators.required]
      }),
      location: new FormControl('', {
        validators: [Validators.required]
      })
    }),

    Sunday: new FormGroup({
      day: new FormControl('', {
        validators: [Validators.required]
      }),
      startTime: new FormControl('', {
        validators: [Validators.required]
      }),
      endTime: new FormControl('', {
        validators: [Validators.required]
      }),
      areaOfLaw: new FormControl('', {
        validators: [Validators.required]
      }),
      services: new FormControl([], {
        validators: [Validators.required]
      }),
      type: new FormControl('', {
        validators: [Validators.required]
      }),
      location: new FormControl('', {
        validators: [Validators.required]
      })
    }),
  });

  roasterList: any[] = [
    {
      day: 0,
      dayName: 'Sunday',
    },
    {
      day: 1,
      dayName: 'Monday',
    },
    {
      day: 2,
      dayName: 'Tuesday',
    },
    {
      day: 3,
      dayName: 'Wednesday',
    },
    {
      day: 4,
      dayName: 'Thursday',
    },
    {
      day: 5,
      dayName: 'Friday',
    },
    {
      day: 6,
      dayName: 'Saturday',
    },
  ];

  times: any[] = [
    {
      value: 1,
      label: '1:00 AM'
    },
    {
      value: 2,
      label: '2:00 AM'
    },
    {
      value: 3,
      label: '3:00 AM'
    },
    {
      value: 4,
      label: '4:00 AM'
    },
    {
      value: 5,
      label: '5:00 AM'
    },
  ];

  areaOfLawlListCopy: any[] = [];
  areaOfLawlListMonday: any[] = [];
  areaOfLawlList: any[] = [
    { label: 'Public law', value: 1 },
    { label: 'Tax law', value: 2 },
    { label: 'Criminal law', value: 3 },
    { label: 'Sports Law', value: 4 }
  ];

  areaOfLawlSelectedServicesFee: string[] = [];
  areaOfLawlSelectedServicesFeeMon: string[] = [];
  areaOfLawlSelectedServicesFeeTue: string[] = [];
  areaOfLawlSelectedServicesFeeWed: string[] = [];
  areaOfLawlSelectedServicesFeeThr: string[] = [];
  areaOfLawlSelectedServicesFeeFri: string[] = [];
  areaOfLawlSelectedServicesFeeSat: string[] = [];
  areaOfLawlSelectedServicesFeeSun: string[] = [];
  lawyerProfileSections: any;
  modes: any[] = [];

  timeSlots: any[] = [];


  constructor(
    private clientService: ClientService,
    private toastService: ToastService,
    private accountService: AccountService,
    private fb: FormBuilder
  ) {


   }

  ngOnInit(): void {
    // this.areaOfLawlListCopy = this.areaOfLawlList;
    // this.addressesCopy = this.addresses;
    this.getLawyerSections();
    this.getRoster();

  }

  feeAreaOfLawChange(event: any, day?: string) {


    if (day == 'Monday') {
      let __data = this.lawyerProfileSections.Services.filter((z: any) => z.AreaOfLaw == event.value)[0].Service;
      this.areaOfLawlSelectedServicesFeeMon = __data;
    }
    if (day == 'Tuesday') {
      let __data = this.lawyerProfileSections.Services.filter((z: any) => z.AreaOfLaw == event.value)[0].Service;
      this.areaOfLawlSelectedServicesFeeTue = __data;
    }
    if (day == 'Wednesday') {
      let __data = this.lawyerProfileSections.Services.filter((z: any) => z.AreaOfLaw == event.value)[0].Service;
      this.areaOfLawlSelectedServicesFeeWed = __data;
    }
    if (day == 'Thursday') {
      let __data = this.lawyerProfileSections.Services.filter((z: any) => z.AreaOfLaw == event.value)[0].Service;
      this.areaOfLawlSelectedServicesFeeThr = __data;
    }
    if (day == 'Friday') {
      let __data = this.lawyerProfileSections.Services.filter((z: any) => z.AreaOfLaw == event.value)[0].Service;
      this.areaOfLawlSelectedServicesFeeFri = __data;
    }
    if (day == 'Saturday') {
      let __data = this.lawyerProfileSections.Services.filter((z: any) => z.AreaOfLaw == event.value)[0].Service;
      this.areaOfLawlSelectedServicesFeeSat = __data;
    }
    if (day == 'Sunday') {
      let __data = this.lawyerProfileSections.Services.filter((z: any) => z.AreaOfLaw == event.value)[0].Service;
      this.areaOfLawlSelectedServicesFeeSun = __data;
    }
    else {
      let __data = this.lawyerProfileSections.Services.filter((z: any) => z.AreaOfLaw == event.value)[0].Service;
      this.areaOfLawlSelectedServicesFee = __data;
    }

    console.log(this.areaOfLawlSelectedServicesFeeMon)

  }

  getLawyerSections() {
    this.accountService.getLawyerSections()
      .then((response: any) => {

        if (response.Succeeded) {
          this.lawyerProfileSections = response.Data;


          //Services
          if (this.lawyerProfileSections.Services.length > 0) {



            this.lawyerProfileSections.Services.forEach((x: any) => {

              let _data = this.areaOfLawlList.filter(z => z.value == x.AreaOfLaw)[0];
              this.areaOfLawlListCopy.push(_data);
            })

              console.log("Services Selection" + this.lawyerProfileSections.Services)
            // let __data = this.lawyerProfileSections.Services.filter((z: any) => z.AreaOfLaw == this.feeSection.value.AreaOfLaw)[0].Service;

            // this.areaOfLawlSelectedServicesFee = __data;

          }

          //ConsultationMode
          if (this.lawyerProfileSections.ConsultationMode) {

            this.modes = this.lawyerProfileSections.ConsultationMode.Mode;

          }


          console.log(this.lawyerProfileSections)

        } else {

        }
      }).catch((error) => {

        console.error(error)

        //<----show toast
        this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
        //show toast ---->

      });

  }

  onSubmitForm() {
    console.log(this.roasterFormGroup.value);
    
    
    
    
    
    this.addRoster();

  }

  get one() { return this.roasterFormGroup.controls; }

  addTimeSlot(data: any, dayName: string) {

    // this.submitted = true;

    // // stop here if form is invalid
    // if (this.roasterFormGroup.value.Monday.invalid) {
    //   return;
    // }

    console.log(data)

    let _data = {
      Day: parseInt(data.day[0]),
      DayName: dayName,
      StartTime: data.startTime.toLocaleTimeString(),
      EndTime: data.endTime.toLocaleTimeString(),
      AreaofLaw: data.areaOfLaw,
      Service: data.services.toString(),
      ConsultationMode: data.type,
      Location: data.location,
    }




    this.timeSlots.push(_data);
    console.log(this.timeSlots)
    // this.roasterFormGroup.reset()
    // console.log(this.roasterFormGroup.value)
  }

  removeTimeSlot(i: any) {
    this.timeSlots.splice(i, 1)
  }

  getRoster() {
    this.accountService.getRoaster()
      .then((response: any) => {
        console.log(response)
        if (response.Succeeded) {
         this.timeSlots = response.Data;
        } else {

        }
      }).catch((error) => {

        console.error(error)

        //<----show toast
        this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
        //show toast ---->

      });

  }

  addRoster() {
    let _data = {
      roster: this.timeSlots
    }

    this.accountService.addRoaster(_data)
      .then((response: any) => {

        //<----show toast
        this.toastService.isToastVisible.emit({ message: response.Message, success: response.Succeeded });
        //show toast ---->
        console.log(response)

      }).catch((error) => {
        
        

        //<----show toast
        this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
        //show toast ---->

      });

  }

}
