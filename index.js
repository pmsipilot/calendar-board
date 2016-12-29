import 'babel-polyfill';
import 'zone.js/dist/zone';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PMSIpilotCalendarBoardModule } from './src/app';



const bootstrap = () => {
    enableProdMode();
    platformBrowserDynamic().bootstrapModule(PMSIpilotCalendarBoardModule);
}

window.bootstrap = bootstrap;
