import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AccountService } from 'src/app/services/account.service';
import { ClientService } from 'src/app/services/client.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  breadcrumbList: any[] = []
  displaySection: number = 1;

  menubar: MenuItem[] = [
    {
      label: 'New Folder',
      icon: 'pi pi-fw pi-folder',
      command: (event) => {
        this.displayBasic = true;
        // console.log("New Folder ", event)
      }
    },
    {
      label: 'New File',
      icon: 'pi pi-fw pi-file',
      command: (event) => {
        this.displayFileModal = true;
        // console.log("New File ", event)
      }
    },
  ];
  items: MenuItem[] = [
    {
      label: 'My Files',
      icon: 'pi pi-fw pi-folder',
      command: (event) => {
        this.displaySection = 1;
        this.loadResources("");
      }
    },
    {
      label: 'Share with me',
      icon: 'pi pi-fw pi-share-alt',
      command: (event) => {
        this.displaySection = 2;
        this.getSharedResources();
      }
    },
    {
      label: 'Trash',
      icon: 'pi pi-fw pi-trash',
      command: (event) => {
        this.displaySection = 3;
        this.getTrashedResources();
        // console.log("My Files ", event)
      }
    }
  ];


  files: File[] = [];


  displayBasic: boolean = false;
  displayFileModal: boolean = false;

  folderForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required]
    }),
  });

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  resourcesList: any[] = [];
  trashedResources: any[] = [];
  sharedResources: any[] = [];
  storageUsed: any;

  isLoadingData: boolean = false;
  isFormsubmitted = false;
  submitted = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {

    this.loadResources("");
    this.getStorageUsed();
  }

  loadResources(parentId: string) {
    if (this.isFormsubmitted) {
      return
    }
    this.isLoadingData = true;
    this.accountService.GetResources(parentId)
      .then((response: any) => {

        if (response.Succeeded) {
          this.resourcesList = response.Data.ResourcesItems;
          this.breadcrumbList = response.Data.NavItems;
        }

        //<----show toast
        // this.toastService.isToastVisible.emit({ message: response.Message, success: response.Succeeded });
        //show toast ---->

        // console.log(response)
        this.displayBasic = false;
        this.folderForm.reset();
        this.isLoadingData = false;
      }).catch((error) => {

        this.isLoadingData = false;
        //<----show toast
        this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
        //show toast ---->

      });
  }

  get one() { return this.folderForm.controls; }

  onSubmitCreaterFolder() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.folderForm.invalid) {
      return;
    }

    this.isFormsubmitted = true;
    let _data = {
      resourceName: this.folderForm.value.name,
      parentId: this.breadcrumbList[this.breadcrumbList.length - 1].NavID
    }

    // console.log(_data)

    this.accountService.createFolder(_data)
      .then((response: any) => {

        this.isFormsubmitted = false;

        if (response.Succeeded) {
          this.loadResources(_data.parentId);
        }


        //<----show toast
        this.toastService.isToastVisible.emit({ message: response.Message, success: response.Succeeded });
        //show toast ---->

        // console.log(response)
        this.displayBasic = false;
        this.folderForm.reset();

      }).catch((error) => {

        this.isFormsubmitted = false;

        //<----show toast
        this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
        //show toast ---->

      });

  }

  uploadFile() {
    this.isFormsubmitted = true;
    const formData = new FormData();

    Array.from(this.files).map((file, index) => {
      return formData.append('FilesRecord', file, file.name);
    });

    formData.append("ParentId", this.breadcrumbList[this.breadcrumbList.length - 1].NavID);
    formData.append("Container", 'lawyer');

    this.accountService.uploadLargeFile(formData).then((response: any) => {
       this.isFormsubmitted = false;
       
      if (response.Succeeded) {
        this.loadResources(this.breadcrumbList[this.breadcrumbList.length - 1].NavID);
      }

      //<----show toast
      this.toastService.isToastVisible.emit({ message: response.Message, success: response.Succeeded });
      //show toast ---->

      // console.log(response)
      this.displayFileModal = false;
     
      // this.folderForm.reset();
      this.files = [];
    }).catch((resp) => {
      this.files = [];
      this.isFormsubmitted = false;
      //<----show toast
      this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
      //show toast ---->
    })

    // const formData = new FormData();

    // formData.append('FilesRecord', this.files[0]);
    // formData.append("ParentId", this.breadcrumbList[this.breadcrumbList.length - 1].NavID);
    // formData.append("Container", 'lawyer');

    // console.log(formData);

    // this.http.post('https://localhost:7198/en-US/api/FileManager/PostlargeFile', formData)
    //   .subscribe(res => {
    //     console.log(res);
    //     alert('Uploaded Successfully.');
    //   })
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  getStorageUsed() {

    this.accountService.getStorageUsed()
      .then((response: any) => {
        if (response.Succeeded) {
          this.storageUsed = response.Data;
        }
      }).catch((error) => {

      });
  }

  getTrashedResources() {
    this.isLoadingData = true;
    this.accountService.getTrashedResources()
      .then((response: any) => {
        if (response.Succeeded) {
          this.trashedResources = response.Data.ResourcesItems;
        }
        this.isLoadingData = false;
      }).catch((error) => {
        this.isLoadingData = false;
      });
  }

  getSharedResources() {
    this.isLoadingData = true;
    this.accountService.getSharedResources()
      .then((response: any) => {
        if (response.Succeeded) {
          this.sharedResources = response.Data;
        }
        this.isLoadingData = false;
      }).catch((error) => {
        this.isLoadingData = false;
      });
  }

  deleteModalOpen(resource: any, index: number) {
    console.log("resource ", resource, index)

    if (confirm("Are you sure you want to move trash?")) {
      this.softDelete(resource.Id, index)
    }
  }

  softDelete(id: string, index: number) {
    this.isFormsubmitted = true
    this.accountService.softDelete(id)
      .then((response: any) => {
        this.isFormsubmitted = false
        //<----show toast
        this.toastService.isToastVisible.emit({ message: response.Message, success: response.Succeeded });
        //show toast ---->

        if (response.Succeeded) {
          this.resourcesList.splice(index, 1);
          // this.sharedResources = response.Data;

        }
      }).catch((error) => {
        this.isFormsubmitted = false
        //<----show toast
        this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
        //show toast ---->
      });
  }

  parmanentDeleteModalOpen(file: any, index: number) {
    console.log(file, index)

    if (confirm("Are you sure you want to Delete Parmanent?")) {
      this.deletePermanently(file, index)
    }
  }

  deletePermanently(file: any, index: number) {
    this.isFormsubmitted = true
    this.accountService.deletePermanently(file)
      .then((response: any) => {

        //<----show toast
        this.toastService.isToastVisible.emit({ message: response.Message, success: response.Succeeded });
        //show toast ---->

        if (response.Succeeded) {
          this.trashedResources.splice(index, 1);
        }

        this.isFormsubmitted = false
      }).catch((error) => {

        this.isFormsubmitted = false

        //<----show toast
        this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
        //show toast ---->
      });
  }

  restoreModalOpen(id: string, index: number) {
    console.log(id, index)

    if (confirm("Are you sure you want to restore?")) {
      this.restoreResource(id, index)
    }
  }

  restoreResource(id: string, index: number) {
    this.isFormsubmitted = true
    this.accountService.restoreResource(id)
      .then((response: any) => {

        //<----show toast
        this.toastService.isToastVisible.emit({ message: response.Message, success: response.Succeeded });
        //show toast ---->

        if (response.Succeeded) {
          this.trashedResources.splice(index, 1);
        }
        this.isFormsubmitted = false

      }).catch((error) => {
        this.isFormsubmitted = false
        //<----show toast
        this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
        //show toast ---->
      });
  }
}
