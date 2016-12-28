import { Injectable } from '@angular/core';
import { CalendarFactory } from './../factories/calendar';

export class CalendarRepository {

    constructor(factory: CalendarFactory) {
        this.factory = factory;
    }

    findOne(calendar = 'primary', limit = 10) {

        let dateStart = new Date();
        let dateEnd = new Date();
        dateEnd.setDate(dateEnd.getDate() + 1);

        return new Promise((resolve, reject) => {
            gapi.client.load('calendar', 'v3').then(() => {
                const request = gapi.client.calendar.events.list({
                    calendarId: calendar,
                    timeMin: dateStart.toISOString(),
                    //timeMax: dateEnd.toISOString(),
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
