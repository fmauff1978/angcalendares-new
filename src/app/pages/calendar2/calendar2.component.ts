import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Timestamp } from 'firebase/firestore';


@Component({
  selector: 'app-calendar2',
  standalone: true,
  imports: [MatButtonModule, FormsModule,
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule],
  templateUrl: './calendar2.component.html',
  styleUrl: './calendar2.component.scss'
})
export class Calendar2Component implements OnInit {

  headers = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  calendarData: any[] = [];
  currentDate: Date = new Date(); // Data atual do calendário

  private totalItems = 42;
  private date = new Date();
  eventos = [{data: this.getSelectDate(2024,9,12), evento: "teste"}, {data:this.getSelectDate(2024,9,14), evento: "teste2"}, {data: this.getSelectDate(2024,9,29), evento: "fabio"}]
  deumatch= false;

    constructor(){


          this.iniciarCalendario();

        //  effect(()=> {

            //this.handleEvent(this.eventos);
        //  })


    }


    ngOnInit() {
      this.handleEvents(); // Chamar a função para associar os eventos ao calendário

      console.log(this.calendarData)
    }

iniciarCalendario(){


//encontrar o dia da semana em que cai o primeiro dia do mes (array de 0 a 6 => dom a sab)
    const dataprimeirodia = this.getSelectDate(this.date.getFullYear(),this.date.getMonth(), 1).getDay();

//encontrar a qtde de dias do mes anterior
    const qtdediasdomesanterior = this.getSelectDate(this.date.getFullYear(),this.date.getMonth(), 0).getDate();


    console.log(dataprimeirodia);
    console.log(qtdediasdomesanterior);
    console.log(this.eventos)

    for (let i = dataprimeirodia; i > 0; i--) {

     this.calendarData.push({
        day: qtdediasdomesanterior - (i - 1), date: this.getSelectDate(this.date.getFullYear(),this.date.getMonth()-1, qtdediasdomesanterior - (i - 1)),
        isCurrentDay: false,
        isCurrentMonth: false,})
    }

    console.log(this.calendarData);

//encontrar a qtde de dias do mes atual
    const daysInMonth = this.getSelectDate(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    console.log(daysInMonth)

//gerar dias do mes atual
    for (let i = 1; i <= daysInMonth; i++) {

      const newDate = this.getSelectDate(this.date.getFullYear(), this.date.getMonth(), i);

          console.log(newDate);


      this.calendarData.push({
        day: i,
        date: newDate,
        isCurrentDay: this.formDate(this.date) === this.formDate(newDate),
        isCurrentMonth: true,
      });
}
        console.log(this.calendarData);

//distribuir os dias pelos 42 blocos do calendario
        const calendarLength = this.calendarData.length;

        for (let i = 1; i <= this.totalItems - calendarLength; i++) {
          this.calendarData.push({
            day: i,
            date: this.getSelectDate(this.date.getFullYear(),this.date.getMonth()+1, i),
            isCurrentDay: false,
            isCurrentMonth: false,


          });
}

console.log(this.calendarData)






  }



    private getSelectDate(year: number, month: number, day: number) {
      return new Date(year, month, day);
    }


    private formDate(date: Date){

      return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;

    }

    createEvent(diasdocalendario, fontedosdados) {
      const selectedIndex = diasdocalendario.findIndex(calendar => this.formDate(calendar.date) === this.formDate(fontedosdados.data));
      if (selectedIndex !== -1) {
          diasdocalendario[selectedIndex].events.push(fontedosdados);
      }
  }

  findEvent(newCalendarData, item) {
    return newCalendarData.map((calendar) => {
        const eventIndex = calendar.events.findIndex(event => event.date === item.data);
        return eventIndex !== -1 ? { eventIndex,  isSameDate: this.formDate(calendar.date) === this.formDate(item.data)} : null;
      }).find(item => item);
}




private handleEvents() {
  this.calendarData.forEach(day => {
    day.events = this.eventos.filter(event => this.formDate(event.data) === this.formDate(day.date));
  });
}


nextMonth() {
  this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1); // Avança para o próximo mês
  this.iniciarCalendario();
}






}
