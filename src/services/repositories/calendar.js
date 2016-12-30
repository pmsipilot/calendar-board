import { Injectable } from '@angular/core';
import { CalendarFactory } from './../factories/calendar';

export class CalendarRepository {

    constructor(factory: CalendarFactory) {
        this.factory = factory;
    }

    findOne(calendar = 'primary', start = new Date(), limit = 10) {

        let dateStart = start;
        dateStart.setHours(0);
        let dateEnd = new Date(dateStart.valueOf()); //clone
        dateEnd.setHours(23);

        return new Promise((resolve, reject) => {
            gapi.client.load('calendar', 'v3').then(() => {
                const request = gapi.client.calendar.events.list({
                    calendarId: calendar,
                    timeMin: dateStart.toISOString(),
                    timeMax: dateEnd.toISOString(),
                    maxResults: limit
                });

                request.execute(res => {
                    if (!!res.error) {
                        return reject(res.error);
                    }

                    resolve(this.factory.create(res));
                });
            });
        });
    }
}
