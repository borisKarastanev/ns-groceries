import { Component } from '@angular/core';

/*'<page-router-outlet></page-router-outlet>' tells IOS and Android that this is a page*/
/*For web apps use <router-outlet>*/
@Component({
    selector: 'main',
    template: '<page-router-outlet></page-router-outlet>'
})

export class AppComponent {}
