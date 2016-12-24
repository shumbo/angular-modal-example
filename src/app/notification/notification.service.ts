import {
    Injectable,
    ViewContainerRef,
    ComponentFactoryResolver,
    ReflectiveInjector,
    ComponentRef
} from '@angular/core';
import { NotificationComponent } from './notification.component';

@Injectable()
export class NotificationContext {
    constructor(
        private _resolve: Function,
        private _reject: Function,
        public text: string,
        public type: NotificationTypes,
        public timeout: number
    ) {
    }
    resolve(val?: any) {
        this._resolve(val);
    }
    reject(reason?: any) {
        this._reject(reason);
    }
}

export type NotificationTypes = 'primary' | 'info' | 'success' | 'warning' | 'danger';

@Injectable()
export class Notification {
    public vcr: ViewContainerRef;
    public count = 0;
    constructor(
        private cfr: ComponentFactoryResolver
    ) {
    }
    set(p: ViewContainerRef) {
        this.vcr = p;
    }
    open<T>(text: string, type: NotificationTypes = 'primary', timeout = 5) {
        let cr: ComponentRef<any>;
        return new Promise<T>((resolve, reject) => {
            const cf = this.cfr.resolveComponentFactory(NotificationComponent);
            const _resolve = (val: T) => {
                if (cr) {
                    cr.destroy();
                    resolve(val);
                    this.count--;
                }
            };
            const _reject = (reason?: any) => {
                if (cr) {
                    cr.destroy();
                    reject(reason);
                    this.count--;
                }
            };
            const bindings = ReflectiveInjector.resolve([
                { provide: NotificationContext, useValue: new NotificationContext(_resolve, _reject, text, type, timeout) }
            ]);
            const ctxInjector = this.vcr.parentInjector;
            const injector = ReflectiveInjector.fromResolvedProviders(bindings, ctxInjector);

            cr = this.vcr.createComponent(cf, this.vcr.length, injector);
            this.vcr.element.nativeElement.appendChild(cr.location.nativeElement);
            this.count++;
        });
    }
}
