import { Component } from '@angular/core';

@Component({
  selector: 'fq-root',
  template: `
    <router-outlet></router-outlet>
    <p-toast position="top-left" key="tl"></p-toast>
  `,
})
export class AppComponent {
  title = 'flags-quiz';
}
