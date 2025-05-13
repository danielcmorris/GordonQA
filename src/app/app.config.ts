import { ApplicationConfig,  provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import {  provideHttpClient , withInterceptors} from '@angular/common/http';
 
  import { provideAuth0 } from '@auth0/auth0-angular';

import { authInterceptor } from './services/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideAuth0({
      domain: 'gordonqa.us.auth0.com',
      clientId: '1PYWLeuSQGiqMP8ASBMe0zhfwqD5p43U',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
     provideRouter(routes, withComponentInputBinding()),
     provideHttpClient(withInterceptors([authInterceptor]))
    ]
};
