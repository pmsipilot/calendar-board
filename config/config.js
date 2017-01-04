export default {
    calendars: process.env.CALENDARBOARD_CALENDARS ? process.env.CALENDARBOARD_CALENDARS.split(',') : [
        "fr.french#holiday@group.v.calendar.google.com"
    ]
};
