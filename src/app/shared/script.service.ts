import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  scripts: string[] = [
    "assets/js/core/jquery.min.js",
    "assets/js/core/popper.min.js",
    "assets/js/core/bootstrap-material-design.min.js",
    "assets/js/plugins/perfect-scrollbar.jquery.min.js",
    "assets/js/plugins/chartist.min.js",
    "assets/js/plugins/bootstrap-notify.js",
    "assets/js/material-dashboard.js",
    "assets/demo/demo.js",
  ];

  constructor() { }

  loadScripts() {
    const body = <HTMLDivElement>document.body;
    for (let src of this.scripts) {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.async = false;
      // script.defer = true;
      body.appendChild(script);
    }
  }
}
