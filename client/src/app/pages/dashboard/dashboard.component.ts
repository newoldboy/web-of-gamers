import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
    selector: 'dashboard',
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: './dashboard.component.html',
    providers: [DashboardService]
})
export class DashboardComponent {

}
