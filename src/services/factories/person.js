import { Injectable } from '@angular/core';
const md5 = require('js-md5');

class Person {
    constructor(name, email, response) {
        this.name = name;
        this.email = email;
        this.response = response;
    }

    didAcceptedEvent() {
        return this.response == 'accepted';
    }

    didDeclinedEvent() {
        return this.response == 'declined';
    }

    didNotReply() {
        return this.response == 'needsAction';
    }

    get displayName() {
        return this.name || this.email;
    }

    get avatar() {
        return `https://www.gravatar.com/avatar/${md5(this.email.toLowerCase())}?s=20`;
    }
}

@Injectable()
export class PersonFactory {

    create(data) {
        return new Person(data.displayName, data.email, data.responseStatus);
    }
}
