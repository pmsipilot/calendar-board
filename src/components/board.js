import { Component, Input } from '@angular/core';
import { EventComponent } from './event';

@Component({
    inputs: ['calendars'],
    selector: 'board-component',
    styles: ['h2 { margin: 0 }', 'h3 { text-align: center }'],
    template: `
    <h2 class="pull-right">
        <i class="fa fa-calendar"></i>
        {{ this.now.toLocaleDateString() }}
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
    constructor() {
        this.calendars = [];
        this.now = new Date();
        this.displayer = localStorage.getItem('board-displayer') || 'list';
        this.hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        this.relativeHours = this.hours.filter(hour => (this.now.getHours() - 1)< hour);
    }

    getEventsByHour(hour) {
        let events = [];
        this.calendars.forEach(calendar => {
            events = events.concat(calendar.getEventsByStartHour(hour));
        });

        return events;
    }

    switchDisplayer(displayer) {
        this.displayer = displayer;
        localStorage.setItem('board-displayer', displayer);
    }
}
