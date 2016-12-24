import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/* Modal */

import { ModalEntryComponent, ModalInnerDirective } from './modal/modal.component';
import { Modal } from './modal/modal.service';

import { AppComponent } from './app.component';
import { SampleModalComponent } from './sample-modal/sample-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalEntryComponent,
    ModalInnerDirective,
    SampleModalComponent
  ],
  entryComponents: [
    SampleModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    Modal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
