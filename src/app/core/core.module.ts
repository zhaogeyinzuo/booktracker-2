import { NgModule, Optional, SkipSelf } from "@angular/core";
import { AddHeaderInterceptor } from "./add-header.interceptor";
import { DataService } from "./data.service";

@NgModule({
    imports: [],
    exports: [],
    providers: [
        DataService,
        AddHeaderInterceptor
    ]
})
export class CoreModule{
    constructor(
        @Optional()
        @SkipSelf()parentMoudle: CoreModule
    ){}
}