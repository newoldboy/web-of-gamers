import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'preview-menu',
    styleUrls: ['./preview-menu.component.scss'],
    templateUrl: './preview-menu.component.html',
    animations: [
        trigger(
            'appear', [
                transition(':enter', [
                    style({transform: 'translateX(100%)', opacity: 0}),
                    animate('200ms', style({transform: 'translateX(0)', opacity: 1}))
                ]),
                transition(':leave', [
                    style({transform: 'translateX(0)', opacity: 1}),
                    animate('200ms', style({transform: 'translateX(100%)', opacity: 0}))
                ])
            ]
        ),
    ],
})
export class PreviewMenuComponent {
    
    @Input() abrePreview: boolean;
    @Output() abrePreviewChange = new EventEmitter();
    
    fecha() {
        this.abrePreview = false;
        this.abrePreviewChange.emit(this.abrePreview);
    }
}

