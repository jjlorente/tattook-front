// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://tattook-back-dev.herokuapp.com/api/v1',
  //apiUrl: 'http://192.168.1.39:3000/api/v1',
  //sockerUrl: 'http://192.168.1.39:3000',
  sockerUrl: 'https://tattook-back-dev.herokuapp.com',
  google_client_id_web: '712092709894-piidfm3f1chc77i18bu15npvqse9d6q5.apps.googleusercontent.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
