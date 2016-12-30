import { Component, Input } from '@angular/core';

@Component({
    inputs: ['person'],
    selector: 'person-label-component',
    styles: ['span { display: inline-block }'],
    template: `
    <span
        class="label"
        [class.label-success]="person.didAcceptedEvent()"
        [class.label-danger]="person.didDeclinedEvent()"
        [class.label-warning]="person.didNotReply()"
    >
        <img class="img-circle" src="{{ person.avatar }}"/>
        {{ person.displayName }}
    </span>`
})
export class PersonLabelComponent {
    constructor() {
        this.person = {};
    }
}
