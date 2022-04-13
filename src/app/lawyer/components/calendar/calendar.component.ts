import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput } from '@fullcalendar/angular';
import { AccountService } from 'src/app/services/account.service';

const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const TOMORROW_STR = tomorrow.toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  eventGuid: number = 0;

  public Events: EventInput[] = [];
  public currentEvents: EventApi[];

  // public Events: EventInput[] = [
  //   {
  //     title: 'Only Monday',
  //     daysOfWeek: ['1'],
  //     startTime: '9:00',
  //     endTime: '10:00',
  //     color: "#ffffff",
  //     backgroundColor: "#000000",
  //   },
  //   {
  //     title: 'Break',
  //     daysOfWeek: ['1'],
  //     startTime: '2:00',
  //     endTime: '3:00',
  //     color: "#ffffff",
  //     backgroundColor: "#000000",
  //   },
  //   {
  //     title: 'Only Tuesday',
  //     daysOfWeek: ['2'],
  //     startTime: '11:00',
  //     endTime: '12:00',
  //     color: "#ffffff",
  //     backgroundColor: "#000000",
  //   },
  //   {
  //     title: 'Only Thusday',
  //     daysOfWeek: ['4'],
  //     startTime: '12:00',
  //     endTime: '15:00',
  //     color: "#ffffff",
  //     backgroundColor: "#000000",
  //   }
  // ];
  calendarOptions: CalendarOptions;
  constructor(
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    // this.getRoster();
    this.getAvailability();

  }

  showPopUP(res: any) {
    console.log('You clicked on : ' + res)
    alert('You clicked on : ')
  }

  createEventId() {
    return String(this.eventGuid++);
  }

  // handleCalendarToggle() {
  //   this.calendarVisible = !this.calendarVisible;
  // }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }
  handleDateSelect(selectInfo: DateSelectArg) {
    console.log(selectInfo)
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    if (title) {
      calendarApi.addEvent({
        id: this.createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }
  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;

    console.log(this.currentEvents)
  }

  getRoster() {
    this.accountService.getRoaster()
      .then((response: any) => {
        console.log(response)
        if (response.Succeeded) {

          this.Events = response.Data.map((value: any) => ({
            title: value.AreaofLaw + ' ' + value.Location,
            daysOfWeek: [value.Day.toString()],
            startTime: value.StartTime,
            endTime: value.EndTime,
            color: "#ffffff",
            backgroundColor: "#000000",
          }))

          this.calendarOptions = {

            businessHours: {
              daysOfWeek: [1, 2, 3, 4, 5],
              startTime: '08:00',
              endTime: '18:00',
            },

            headerToolbar: {
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            initialView: 'dayGridMonth',
            //dateClick: this.onDateClick.bind(this),
            events: this.Events,
            //businessHours: false,
            initialEvents: this.Events, // alternatively, use the `events` setting to fetch from a feed
            weekends: true,
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            select: this.handleDateSelect.bind(this),
            eventClick: this.handleEventClick.bind(this),
            eventsSet: this.handleEvents.bind(this)
          };

        } else {

        }
      }).catch((error) => {

        console.error(error)

        //<----show toast
        // this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
        //show toast ---->

      });

  }

  getAvailability() {
    this.accountService.getAvailability()
      .then((response: any) => {
        console.log(response)
        if (response.Succeeded) {

          this.Events = response.Data.map((value: any) => ({
            title: "Availability Count: "  +value.AvailabilityCount,
            daysOfWeek: [value.Day.toString()],
            //startTime: value.StartTime,
            // endTime: value.EndTime,
            //color: "#ffffff",
            //backgroundColor: "#000000",
          }))

          this.calendarOptions = {

            businessHours: {
              daysOfWeek: [1, 2, 3, 4, 5],
              startTime: '08:00',
              endTime: '18:00',
            },

            headerToolbar: {
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            initialView: 'dayGridMonth',
            //dateClick: this.onDateClick.bind(this),
            events: this.Events,
            //businessHours: false,
            initialEvents: this.Events, // alternatively, use the `events` setting to fetch from a feed
            weekends: true,
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            select: this.handleDateSelect.bind(this),
            eventClick: this.handleEventClick.bind(this),
            eventsSet: this.handleEvents.bind(this)
          };

        } else {

        }
      }).catch((error) => {

        console.error(error)

        //<----show toast
        // this.toastService.isToastVisible.emit({ message: "Try Again Later!", success: false });
        //show toast ---->

      });

  }

}
