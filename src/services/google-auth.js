import { Injectable } from '@angular/core';

@Injectable()
export class GoogleAuth {

    constructor() {
        this.key = require('./../config/key.json');
        this.clientId = this.key.web.client_id;
        this.scopes = ['https://www.googleapis.com/auth/calendar.readonly'];
    }

    checkAuth() {
        return new Promise((resolve, reject) => {
            gapi.auth.authorize({
                client_id: this.clientId,
                scope: this.scopes.join(' '),
                immediate: false
            }, authResult => {
                if (authResult && !authResult.error) {
                    return resolve();
                }
                console.log(authResult.error);
                return reject(new Error(authResult.error));
            });
        });
    }
}
