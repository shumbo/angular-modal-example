import {
    Injectable,
    ViewContainerRef,
    Component,
    ViewChild,
    Directive,
    AfterViewInit
} from '@angular/core';
import { Modal } from './modal.service';

@Directive({
    selector: '[appModalInner]',
})
export class ModalInnerDirective {
    constructor(public vcr: ViewContainerRef) {
    }
}

@Component({
    selector: 'app-modal-entry',
    template: `
    <div class='bg' [class.active]="modal.isShow()">
      <div appModalInner></div>
    </div>
  `,
    providers: [ModalInnerDirective],
})
export class ModalEntryComponent implements AfterViewInit {
    @ViewChild(ModalInnerDirective) private inner: ModalInnerDirective;
    constructor(
        public modal: Modal
    ) {
    }
    ngAfterViewInit() {
        this.modal.vcr = this.inner.vcr;
    }
}
