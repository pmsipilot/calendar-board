import { Injectable } from '@angular/core';
import key from '../../config/key.js';

@Injectable()
export class GoogleAuth {

    constructor() {
        this.clientId = key.web.client_id;
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

                return reject(new Error(authResult.error));
            });
        });
    }
}
