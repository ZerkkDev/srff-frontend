// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  base: 'http://127.0.0.1:8000/api/',
  // ws: 'ws://localhost:3000',

  firebaseConfig: {
    apiKey: "AIzaSyBk1D8ToHI_egAl0Zgdm_SvBg6y6n6z258",
    authDomain: "test-projects-a7517.firebaseapp.com",
    databaseURL: "https://test-projects-a7517-default-rtdb.firebaseio.com",
    projectId: "test-projects-a7517",
    storageBucket: "test-projects-a7517.appspot.com",
    messagingSenderId: "710251516034",
    appId: "1:710251516034:web:74c84b750fc4f313efe49b",
    measurementId: "G-W9VT04K27C"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
