import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DateManager extends EventEmitter {

    constructor() {
        super();
        this.currentDate = new Date();
    }

    increaseDate() {
        this.currentDate.setDate(this.currentDate.getDate() + 1);
        this.currentDate.setHours(0);
        this.emit(this.copy(this.currentDate));
    }

    decreaseDate() {
        this.currentDate.setDate(this.currentDate.getDate() - 1);
        this.currentDate.setHours(0);
        this.emit(this.copy(this.currentDate));
    }

    copy(date) {
        return new Date(date.valueOf());
    }

    reset() {
        this.currentDate = this.copy(this.now);
    }

    get now() {
        return new Date();
    }
}
