import { NgModule, Component } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { GoogleAuth } from './services/google-auth';
import { CalendarRepository } from './services/repositories/calendar';
import { EventFactory } from './services/factories/event';
import { PersonFactory } from './services/factories/person';
import { CalendarFactory } from './services/factories/calendar';
import { DateManager } from './services/date';

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
                <a class="navbar-brand" href="#">PMSIpilot calendrier</a>
            </header>

            <button title="Réinitialiser" type="button" class="btn btn-link navbar-btn pull-right" (click)="getCalendarsEvents()">
                <i class="fa fa-refresh" [class.fa-spin]="loading == true"></i>
            </button>
        </div>
    </nav>
    <section>
        <p *ngIf="null !== error" class="alert alert-danger">{{ error }}</p>
        <board-component [calendars]="calendars"></board-component>
    </section>
    `
})
class AppComponent {
    constructor (auth: GoogleAuth, calendarRepository: CalendarRepository, dateManager: DateManager) {
        this.calendars = [];
        this.lastTimer = null;
        this.loading = false;
        this.error = null;

        this.dateManager = dateManager;
        this.calendarRepository = calendarRepository;
        this.config = require('./../config/config.json');

        this.dateManager.subscribe(date => this.getCalendarsEvents(date));
        auth.checkAuth().then(() => this.getCalendarsEvents());
    }

    getCalendarsEvents(startDate = null) {
        clearTimeout(this.lastTimer);
        this.loading = true;
        this.error = null;

        if (null === startDate) {
            startDate = this.dateManager.now;
            this.dateManager.reset();
        }

        Promise.all(
            this.config.calendars.map(calendarId => this.calendarRepository.findOne(calendarId, startDate))
        ).then(calendars => {
            this.loading = false;
            this.calendars = calendars;
        }).catch(err => {
            this.loading = false;
            this.error = `Oops! Une erreur s'est produite : [${err.code}] ${err.message}`;
        });

        this.lastTimer = setTimeout(() => this.getCalendarsEvents(), 1000 * 60 * 10);
    }
}

@NgModule({
    declarations: [AppComponent, BoardComponent, EventComponent, PersonLabelComponent],
    imports: [BrowserModule, HttpModule, JsonpModule],
    providers: [GoogleAuth, CalendarRepository, CalendarFactory, EventFactory, PersonFactory, DateManager],
    bootstrap: [AppComponent]
})
export class PMSIpilotCalendarBoardModule {}
