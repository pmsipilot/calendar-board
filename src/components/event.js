import { Component, Input } from '@angular/core';
import { PersonLabelComponent } from './person-label';

@Component({
    inputs: ['event', 'displayer'],
    selector: 'event-component',
    template: `
    <div class="panel panel-default" *ngIf="displayer == 'full'">
        <header class="panel-heading">
            {{ event.summary }}
            <span class="pull-right">{{ event.location }}</span>
        </header>
        <div class="panel-body">
            <pre *ngIf="!!event.description">{{ event.description }}</pre>
            <person-label-component *ngFor="let person of event.attendees" [person]="person"></person-label-component>
        </div>
        <footer class="panel-footer">
            De {{ event.start.getHours() }}h{{ event.start.getMinutes() }} à {{ event.end.getHours() }}h{{ event.end.getMinutes() }}
            <a class="pull-right" target="_blank" href="{{ event.link }}"><i class="fa fa-external-link"></i></a>
        </footer>
    </div>

    <span class="label label-primary" *ngIf="displayer == 'compact'">
        {{ event.summary }} <i class="fa fa-users"></i> {{ event.attendees.length }}
    </span>
    `
})
export class EventComponent {
    constructor() {
        this.event = {};
        this.displayer = 'full';
    }
}
