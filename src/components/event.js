import { Component, Input } from '@angular/core';
import { PersonLabelComponent } from './person-label';
import { DateManager } from './../services/date';

@Component({
    inputs: ['event', 'displayer'],
    selector: 'event-component',
    template: `
    <div class="panel panel-default"
        [class.panel-warning]="isInProgress()"
        [class.panel-danger]="isFinished()"
        *ngIf="displayer == 'full'"
    >
        <header class="panel-heading">
            {{ event.summary }}
            <span class="pull-right">{{ event.location }}</span>
        </header>
        <div class="panel-body">
            <pre *ngIf="!!event.description">{{ event.description }}</pre>
            <person-label-component *ngFor="let person of event.attendees" [person]="person"></person-label-component>
        </div>
        <footer class="panel-footer">
            De {{ getHourFormated(event.start) }} à {{ getHourFormated(event.end) }}
            <a class="pull-right" target="_blank" href="{{ event.link }}"><i class="fa fa-external-link"></i></a>
        </footer>
    </div>

    <span class="label label-primary" *ngIf="displayer == 'compact'">
        {{ event.summary }} <i class="fa fa-users"></i> {{ event.attendees.length }}
    </span>
    `
})
export class EventComponent {
    constructor(dateManager: DateManager) {
        this.event = {};
        this.displayer = 'full';
        this.dateManager = dateManager;
    }

    getHourFormated(date) {
        return (('0' + date.getHours()).slice(-2)) + 'h' + (('0' + date.getMinutes()).slice(-2));
    }

    isInProgress() {
        return this.event.start < this.dateManager.now && this.event.end > this.dateManager.now;
    }

    isFinished() {
        return this.event.end < this.dateManager.now;
    }
}
