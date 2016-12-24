import { Component } from '@angular/core';

import { Modal } from './modal/modal.service';
import { Notification, NotificationTypes } from './notification/notification.service';

import { SampleModalComponent } from './sample-modal/sample-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  message = 'Message';
  type: NotificationTypes = 'primary';
  expire = 5;
  constructor(
    private modal: Modal,
    private notification: Notification
  ) { }
  openModal() {
    this.modal.open<string>(SampleModalComponent).then(name => {
      if (name) {
        this.title = `Hello ${name}`;
      } else {
        this.notification.open('Name was not set', 'danger', 3);
      }
    }).catch(e => {
      // rejected
      this.notification.open('Modal was closed', 'warning', 3);
      if (e) {
        console.warn(e);
      }
    });
  }
  notify() {
    this.notification.open(this.message, this.type, this.expire);
  }
}
