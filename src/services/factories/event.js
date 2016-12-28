import { Injectable } from '@angular/core';
import { PersonFactory } from './person';

class Event {
    constructor(summary, description, location, attendees, start, end, status, link) {
        this.summary = summary;
        this.description = description;
        this.location = location;
        this.attendees = attendees;
        this.start = start;
        this.end = end;
        this.status = status;
        this.link = link;
    }
}

@Injectable()
export class EventFactory {
    constructor(personFactory: PersonFactory) {
        this.personFactory = personFactory;
    }

    create(data) {
        return new Event(
            data.summary,
            data.description,
            data.location,
            data.attendees.map(person => this.personFactory.create(person)),
            new Date(data.start.dateTime),
            new Date(data.end.dateTime),
            data.confirmed,
            data.htmlLink
        );
    }
}
