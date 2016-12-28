import 'babel-polyfill';
import 'zone.js/dist/zone';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PMSIpilotCalendarBoardModule } from './src/app';

// Need to bootstrap angular app after gapi is loaded
const bootstrap = () => {
    console.log('bootstrap');
    platformBrowserDynamic().bootstrapModule(PMSIpilotCalendarBoardModule);
}

window.bootstrap = bootstrap;
