import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LawyerRoutingModule } from './lawyer-routing.module';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { RoundBlockDirective } from '../directives/round-block.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodeInputModule } from 'angular-code-input';
import { ProfileComponent } from './components/profile/profile.component';
import { DividerModule } from 'primeng/divider';
import { ChipsModule } from 'primeng/chips';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { ChipModule } from 'primeng/chip';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ListboxModule } from 'primeng/listbox';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { RoasterComponent } from './components/roaster/roaster.component';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FileManagerComponent } from './components/file-manager/file-manager.component';


import {BreadcrumbModule} from 'primeng/breadcrumb';
import { TieredMenuModule } from 'primeng/tieredmenu';
import {SplitButtonModule} from 'primeng/splitbutton';
import {SplitterModule} from 'primeng/splitter';
import {MenubarModule} from 'primeng/menubar';
import {ToolbarModule} from 'primeng/toolbar';
import { MenuItem } from 'primeng/api';
import {CardModule} from 'primeng/card';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    RoundBlockDirective,
    ProfileComponent,
    CalendarComponent,
    RoasterComponent,
    FileManagerComponent,
    ContactsComponent,
    AddContactComponent,
  ],
  imports: [
    CommonModule,
    LawyerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CodeInputModule,
    DividerModule,
    ChipsModule,
    RadioButtonModule,
    AccordionModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    TableModule,
    PanelModule,
    ChipModule,
    FullCalendarModule,
    CheckboxModule,
    ListboxModule,
    MultiSelectModule,
    CalendarModule,
    NgxDropzoneModule,
    TieredMenuModule,
    CardModule,
    ToolbarModule,
    SplitButtonModule,
    SplitterModule,
    MenubarModule,
    BreadcrumbModule,
    // MenuItem,
  ],
  providers: [

  ]
})
export class LawyerModule { }
