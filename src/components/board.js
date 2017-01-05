import { Component, Input } from '@angular/core';
import { EventComponent } from './event';

import { DateManager } from './../services/date';

@Component({
    inputs: ['calendars'],
    selector: 'board-component',
    styles: ['h2 { margin: 0 }', 'h3 { text-align: center }'],
    template: `
    <h2 class="pull-right">
        <button class="btn btn-link" (click)="dateManager.decreaseDate()"><i class="fa fa-chevron-left"></i></button>
        <i class="fa fa-calendar"></i> {{ dateManager.currentDate.toLocaleDateString() }}
        <button class="btn btn-link" (click)="dateManager.increaseDate()"><i class="fa fa-chevron-right"></i></button>
    </h2>

    <div class="btn-group">
        <button class="btn btn-default" [class.active]="displayer == 'list'" (click)="switchDisplayer('list')">
            <i class="fa fa-th-large"></i>
        </button>
        <button class="btn btn-default" [class.active]="displayer == 'table'" (click)="switchDisplayer('table')">
            <i class="fa fa-th-list"></i>
        </button>
    </div>
    <hr/>

    <div class="col-md-12" *ngIf="displayer == 'list'">
        <div *ngIf="hasNothingToShow()" class="alert alert-info">
            <p>Plus aucun évenement programmé pour le {{ dateManager.currentDate.toLocaleDateString() }}.<br/>
            Utilisez les boutons <i class="fa fa-chevron-left"></i> et <i class="fa fa-chevron-right"></i> pour naviguer de jour en jour.</p>

            <p>La page se met à jour toutes les 10 min automatiquement. Vous pouvez appuyer sur le bouton <i class="fa fa-refresh"></i> pour réinitialiser la vue.</p>
        </div>

        <div>
            <div class="col-md-12" *ngIf="getWholeDayEvents().length > 0">
                <article *ngFor="let event of getWholeDayEvents(hour)" class="col-md-6">
                    <event-component [event]="event"></event-component>
                </article>
            </div>
        </div>

        <div *ngFor="let hour of relativeHours">
            <!-- a changer pour ne pas avoir 2x getEventsByHour(hour) -->
            <div class="col-md-12" *ngIf="getEventsByHour(hour).length > 0">
                <h3>{{ hour }} h</h3>
                <article *ngFor="let event of getEventsByHour(hour)" class="col-md-6">
                    <event-component [event]="event"></event-component>
                </article>
            </div>
        </div>
    </div>

    <div class="col-md-12" *ngIf="displayer == 'table'">
        <table class="table table-striped">
            <tr>
                <th></th>
                <th *ngFor="let calendar of calendars">{{ calendar.summary }}</th>
            </tr>
            <tr>
                <th></th>
                <td *ngFor="let calendar of calendars">
                    <article *ngFor="let event of calendar.getWholeDayEvents()">
                        <event-component [event]="event" [displayer]="'compact'"></event-component>
                    </article>
                </td>
            </tr>
            <tr *ngFor="let hour of hours">
                <td>{{ hour }} h</td>
                <td *ngFor="let calendar of calendars">
                    <article *ngFor="let event of calendar.getEventsByStartHour(hour)">
                        <event-component [event]="event" [displayer]="'compact'"></event-component>
                    </article>
                </td>
            </tr>
        </table>
    </div>`
})
export class BoardComponent {
    constructor(dateManager: DateManager) {
        this.calendars = [];
        this.displayer = localStorage.getItem('board-displayer') || 'list';

        this.dateManager = dateManager;

        this.hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    }

    ngOnChanges() {
        this.relativeHours = this.hours.filter(hour => (this.dateManager.currentDate.getHours() - 1) <= hour);
    }

    getEventsByHour(hour) {
        let events = [];
        this.calendars.forEach(calendar => {
            events = events.concat(calendar.getEventsByStartHour(hour));
        });

        return events;
    }

    getWholeDayEvents(hour) {
        let events = [];

        this.calendars.forEach(calendar => {
            events = events.concat(calendar.getWholeDayEvents());
        });

        return events;
    }

    switchDisplayer(displayer) {
        this.displayer = displayer;
        localStorage.setItem('board-displayer', displayer);
    }

    hasNothingToShow() {
        return this.calendars.every(calendar => {
            const currentHour = this.dateManager.currentDate.getHours();
            const hasFinishedEvents = calendar.events.find(event => event.start.getHours() < currentHour);

            return calendar.events.length === 0 || hasFinishedEvents;
        });
    }
}
