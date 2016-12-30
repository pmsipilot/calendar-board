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
}

@Injectable()
export class CalendarFactory {
    constructor(eventFactory: EventFactory) {
        this.eventFactory = eventFactory;
    }

    create(data) {
        return new Calendar(
            data.summary,
            data.items.map(event => this.eventFactory.create(event))
        );
    }
}
