import {
    Injectable,
    ViewContainerRef,
    ComponentFactoryResolver,
    ReflectiveInjector,
    ComponentRef,
} from '@angular/core';

@Injectable()
export class ModalContext {
    constructor(
        private _resolve: Function,
        private _reject: Function
    ) {
    }
    resolve(val?: any) {
        this._resolve(val);
    }
    reject(reason?: any) {
        this._reject(reason);
    }
}

@Injectable()
export class Modal {
    public vcr: ViewContainerRef;
    public count = 0;
    constructor(
        private cfr: ComponentFactoryResolver
    ) {
    }
    isShow() {
        return this.count > 0;
    }
    set(p: ViewContainerRef) {
        this.vcr = p;
    }
    open<T>(comp: any) {
        let cr: ComponentRef<any>;
        return new Promise<T>((resolve, reject) => {
            const cf = this.cfr.resolveComponentFactory(comp);
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
                { provide: ModalContext, useValue: new ModalContext(_resolve, _reject) }
            ]);
            const ctxInjector = this.vcr.parentInjector;
            const injector = ReflectiveInjector.fromResolvedProviders(bindings, ctxInjector);

            cr = this.vcr.createComponent(cf, this.vcr.length, injector);
            this.vcr.element.nativeElement.appendChild(cr.location.nativeElement);
            this.count++;
        });
    }
}
