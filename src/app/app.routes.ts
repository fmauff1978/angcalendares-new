import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { Calendar2Component } from './pages/calendar2/calendar2.component';

export const routes: Routes = [

  {
    path: 'calendar',
    component: CalendarComponent

  }

  ,

  {
    path: 'calendar2',
    component: Calendar2Component

  }


];
