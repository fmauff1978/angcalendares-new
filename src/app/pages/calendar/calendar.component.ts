import { Component, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NCalendar } from '../../models/calendar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


import { MatTooltipModule } from '@angular/material/tooltip';

import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MatButtonModule, CommonModule,
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {

  headers: NCalendar.Header = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  private totalItems = 42;

  private date = new Date();
  calendarData: any[] = [];
  dialogService: any;

  events = [{data: "2024-12-10", evento: "teste"}, {data:"2024-12-13", evento: "teste2"}]


  // calendarData = new Array(42).fill(1);

  constructor() {
    this.createCalendarData();

  }

  createCalendarData() {

    const firstDayinMonth = this.getSelectDate(this.date.getFullYear(),this.date.getMonth(), 1).getDay();
    const previousMonth = this.getSelectDate(this.date.getFullYear(),this.date.getMonth(), 0).getDate();

    console.log(previousMonth);
    console.log(firstDayinMonth);

          for (let i = firstDayinMonth; i > 0; i--) {

                  this.calendarData.push({
                    day: previousMonth - (i - 1),
                    isCurrentDay: false,
                    isCurrentMonth: false,
                    events: this.events,
                    date: this.getSelectDate(this.date.getFullYear(),this.date.getMonth()-1, previousMonth - (i - 1))
                  });
    }

    const daysInMonth = this.getSelectDate(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();




            for (let i = 1; i <= daysInMonth; i++) {

              const newDate =this.getSelectDate(this.date.getFullYear(), this.date.getMonth(), i);

                  console.log(newDate);


              this.calendarData.push({
                day: i,
                isCurrentDay: this.formDate(this.date) === this.formDate(newDate),
                isCurrentMonth: true,
                events: this.events,
                date: newDate
              });
    }

    const calendarLength = this.calendarData.length;


            for (let i = 1; i <= this.totalItems - calendarLength; i++) {
              this.calendarData.push({
                day: i,
                isCurrentDay: false,
                isCurrentMonth: false,
                events: this.events,
                date: this.getSelectDate(this.date.getFullYear(),this.date.getMonth()+1, i)
              }

              );
    }

          console.log(this.calendarData);
          console.log(this.date);


          console.log(this.getSelectDate(this.date.getFullYear(), this.date.getMonth() + 1, 1)
    );

  }

  private getSelectDate(year: number, month: number, day: number) {
    return new Date(year, month, day);
  }


  private formDate(date: Date){

    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;

  }

  private createEvent(item: NCalendar.IEvent){

    const newCalendarData = [... this.calendarData];

    const findEvent = newCalendarData.map((calendar, calendarIndex) =>{

    const eventIndex = calendar.events.findIndex(event => this.formDate(event.date)=== this.formDate(item.date))

      return eventIndex !== 1 ? {eventIndex, calendarIndex}: null;
    }).find(item=> item)



    if (!findEvent){


        const selectedIndex = newCalendarData.findIndex(calendar => this.formDate(calendar.date) === this.formDate(item.date));


        if (selectedIndex!== -1){

          newCalendarData[selectedIndex].events.push(item);


        }





    }

    console.log(findEvent);



 }

  openModal() {}
}
