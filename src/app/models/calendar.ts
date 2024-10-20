export namespace NCalendar{


  export type Header= [string, string, string, string, string, string, string];



  export interface Body{

    day: number;
    isCurrentDay: boolean;
    isCurrentMonth: boolean;
    events: any[]
    date: Date


  }


  export interface IEvent{

    name: string;
    id: string;
    icon: string;
    date: Date;


  }





}
