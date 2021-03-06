import { Injectable } from '@angular/core';
import { EventFactory } from './event';

class Calendar {
    constructor(summary, events = []) {
        this.summary = summary;
        this.events = events;
    }

    getEventsByStartHour(hour) {
        return this.events.filter(event => event.start.getHours() == hour);
    }

    getWholeDayEvents() {
        console.log(this.events);
        return this.events.filter(event => event.end - event.start === 86400000);
    }
}

@Injectable()
export class CalendarFactory {
    constructor(eventFactory: EventFactory) {
        this.eventFactory = eventFactory;
    }

    create(data) {
        return new Calendar(
            data.summary,
            data.items
                .filter(event => event.visibility !== 'private')
                .map(event => this.eventFactory.create(event))
        );
    }
}
