import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/* Modal */
import { ModalEntryComponent, ModalInnerDirective } from './modal/modal.component';
import { Modal } from './modal/modal.service';

/* Notification */
import { NotificationComponent, NotificationEntryComponent, NotificationInnerDirective } from './notification/notification.component';
import { Notification } from './notification/notification.service';

import { AppComponent } from './app.component';
import { SampleModalComponent } from './sample-modal/sample-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalEntryComponent,
    ModalInnerDirective,
    SampleModalComponent,
    NotificationComponent,
    NotificationEntryComponent,
    NotificationInnerDirective
  ],
  entryComponents: [
    SampleModalComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    Modal,
    Notification
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
