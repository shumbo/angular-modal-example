import { Component } from '@angular/core';

import { Modal } from './modal/modal.service';

import { SampleModalComponent } from './sample-modal/sample-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  constructor(
    private modal: Modal
  ) { }
  openModal() {
    this.modal.open<string>(SampleModalComponent).then(name => {
      this.title = `Hello ${name}`;
    }).catch(e => {
      // rejected
      if (e) {
        console.warn(e);
      }
    });
  }
}
