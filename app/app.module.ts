import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptRouterModule } from 'nativescript-angular/router'

import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from './app.routing';

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(routes)
    ],
    /*ES6 Spread syntax????*/
    declarations: [AppComponent, ...navigatableComponents],
    bootstrap: [AppComponent]
})
export class AppModule {}
