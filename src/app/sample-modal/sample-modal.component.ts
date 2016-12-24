import { Component, OnInit } from '@angular/core';

import { ModalContext } from '../modal/modal.service';

@Component({
  selector: 'app-sample-modal',
  templateUrl: './sample-modal.component.html',
  styleUrls: ['./sample-modal.component.scss']
})
export class SampleModalComponent implements OnInit {
  public name: string;
  constructor(
    private modalCtx: ModalContext
  ) { }

  ngOnInit() {
  }
  close() {
    this.modalCtx.reject();
  }
  done() {
    this.modalCtx.resolve(this.name);
  }

}
