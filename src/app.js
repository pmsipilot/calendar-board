import { NgModule, Component } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { GoogleAuth } from './services/google-auth';
import { CalendarRepository } from './services/repositories/calendar';
import { EventFactory } from './services/factories/event';
import { PersonFactory } from './services/factories/person';
import { CalendarFactory } from './services/factories/calendar';

import { BoardComponent } from './components/board';
import { EventComponent } from './components/event';
import { PersonLabelComponent } from './components/person-label';

@Component({
    selector: 'pmsipilot-calendar-board',
    styles: ['section { margin: 0 10px }'],
    template: `
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <header class="navbar-header">
                <a class="navbar-brand" href="#">PMSIpilot calendrier des salles</a>
            </header>
        </div>
    </nav>
    <section>
        <board-component [calendars]="calendars"></board-component>
    </section>
    `
})
class AppComponent {
    constructor (auth: GoogleAuth, calendarRepository: CalendarRepository) {
        this.calendars = [];
        this.calendarRepository = calendarRepository;
        this.lastTimer = null;

        auth.checkAuth().then(() => this.getCalendarsEvents());
    }

    getCalendarsEvents() {
        Promise.all([
            this.calendarRepository.findOne('pmsipilot.com_3434373131343836383732@resource.calendar.google.com'),
            this.calendarRepository.findOne('pmsipilot.com_2d35313135323638372d383138@resource.calendar.google.com'),
            this.calendarRepository.findOne('pmsipilot.com_3737393736323538323838@resource.calendar.google.com'),
            this.calendarRepository.findOne('pmsipilot.com_323639323331363836@resource.calendar.google.com'),
            this.calendarRepository.findOne('pmsipilot.com_39343333373134323839@resource.calendar.google.com'),
            this.calendarRepository.findOne('pmsipilot.com_2d3231363932313739313239@resource.calendar.google.com'),
            this.calendarRepository.findOne('pmsipilot.com_3632373130363731363735@resource.calendar.google.com')
        ]).then(calendars => {
            this.calendars = calendars;
        });

        this.lastTimer = setTimeout(() => this.getCalendarsEvents(), 1000 * 60 * 5);
    }
}

@NgModule({
    declarations: [AppComponent, BoardComponent, EventComponent, PersonLabelComponent],
    imports: [BrowserModule, HttpModule, JsonpModule],
    providers: [GoogleAuth, CalendarRepository, CalendarFactory, EventFactory, PersonFactory],
    bootstrap: [AppComponent]
})
export class PMSIpilotCalendarBoardModule {}
