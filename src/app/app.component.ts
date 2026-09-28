import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './layout/sidebar.component';
@Component({selector:'app-root',standalone:true,imports:[RouterOutlet,SidebarComponent],template:`<div class="app-shell"><app-sidebar></app-sidebar><main class="app-content"><router-outlet></router-outlet></main></div>`})
export class AppComponent {}