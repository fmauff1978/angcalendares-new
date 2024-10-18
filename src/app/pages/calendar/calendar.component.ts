import { Component, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NCalendar } from '../../models/calendar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {

  headers: NCalendar.Header = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  private totalItems = 42;

  private date = new Date();
  calendarData: NCalendar.Body[] = [];

  // calendarData = new Array(42).fill(1);

  constructor() {
    this.createCalendarData();
   // effect(()=>{

      //  if (this.dialogService.getEvent)


   // })
  }

  createCalendarData() {

    const firstDayinMonth = new Date(this.date.getFullYear(),this.date.getMonth(), 1).getDay();
    const previousMonth = new Date(this.date.getFullYear(),this.date.getMonth(), 0).getDate();

    console.log(previousMonth);
    console.log(firstDayinMonth);

          for (let i = firstDayinMonth; i > 0; i--) {

                  this.calendarData.push({ day: previousMonth - (i - 1) ,
                       isCurrentDay: false,
                      isCurrentMonth: false
                    });
    }

    const daysInMonth = this.getSelectDate(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();




            for (let i = 1; i <= daysInMonth; i++) {

              const newDate =this.getSelectDate(this.date.getFullYear(), this.date.getMonth(), i);

                  console.log(newDate);


              this.calendarData.push({ day: i ,
                isCurrentDay: this.formDate(this.date) === this.formDate(newDate),
                  isCurrentMonth: true
              });
    }

    const calendarLength = this.calendarData.length;


            for (let i = 1; i <= this.totalItems - calendarLength; i++) {
              this.calendarData.push({ day: i,
                isCurrentDay: false,
                  isCurrentMonth: false
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

  ////private createEvent(item: NCalendar.IEvent){


 // }

  openModal() {}
}
