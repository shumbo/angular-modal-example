import {
    Injectable,
    Inject,
    forwardRef,
    ViewContainerRef,
    Component,
    ViewChild,
    Directive,
    AfterViewInit,
    OnInit
} from '@angular/core';
import { Notification, NotificationContext } from './notification.service';

@Directive({
    selector: '[appNotificationInner]'
})
export class NotificationInnerDirective {
    constructor(public vcr: ViewContainerRef) {
    }
}

@Component({
    selector: 'app-notification-entry',
    template: `
    <div class='notifications'>
        <div appNotificationInner></div>
    </div>
    `,
    styles: [`
        .notifications{
            position:fixed;
            top:0;
            right:0;
            z-index: 10000;
        }
        [appNotificationInner]{
            display: flex;
            flex-direction: column-reverse;
        }
    `]
})
export class NotificationEntryComponent implements AfterViewInit {
    @ViewChild(NotificationInnerDirective) private inner: NotificationInnerDirective;
    constructor(
        @Inject(forwardRef(() => Notification)) public notification: Notification
    ) {
    }
    ngAfterViewInit() {
        this.notification.set(this.inner.vcr);
    }
}

@Component({
    selector: 'app-notification',
    template: `
    <div class="p7-notification notification" [ngClass]="elementClass">
        <button class="delete" (click)="close()"></button>
        <div [innerHTML]='text'></div>
    </div>
    `,
    styles: [
        `.notification{
            width: 300px;
            margin: 10px 0;
            position:relative;
        }`
    ]
})
export class NotificationComponent implements OnInit {
    public text: string;
    public elementClass: string[];
    private closed = false;
    constructor(
        @Inject(forwardRef(() => NotificationContext)) private notificationCtx: NotificationContext
    ) {
        this.text = notificationCtx.text;
        this.elementClass = ['is-' + notificationCtx.type];
    }
    close() {
        this.closed = true;
        this.notificationCtx.resolve();
    }
    ngOnInit() {
        setTimeout(() => {
            if (!this.closed) {
                this.notificationCtx.resolve();
            }
        }, this.notificationCtx.timeout * 1000);
    }
}
