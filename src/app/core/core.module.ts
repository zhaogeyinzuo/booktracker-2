import { NgModule, Optional, SkipSelf } from "@angular/core";
import { AddHeaderInterceptor } from "./add-header.interceptor";
import { DataResolverService } from "./data.resolver.service";
// import { DataResolverService } from "./data.resolver.service";
import { DataService } from "./data.service";

@NgModule({
    imports: [],
    exports: [],
    providers: [
        DataService,
        AddHeaderInterceptor,
        DataResolverService
    ]
})
export class CoreModule{
    constructor(
        @Optional()
        @SkipSelf()parentMoudle: CoreModule
    ){}
}