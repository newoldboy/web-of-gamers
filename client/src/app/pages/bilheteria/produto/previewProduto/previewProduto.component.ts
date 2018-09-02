import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
    selector: 'preview-produto',
    templateUrl: './previewProduto.component.html',
    styleUrls: ['./previewProduto.component.scss'],
    providers: [ProdutoService],
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
export class PreviewProdutoComponent {

    @Input() produto = {};

    @Input() abrePreview: boolean;
    @Output() abrePreviewChange = new EventEmitter();

    constructor(
        private router: Router,
    ) { }

    fecha() {
        this.abrePreview = false;
        this.abrePreviewChange.emit(this.abrePreview);
    }

    goAltProduto() {
        this.router.navigate(['./pages/bilheteria/produto', {id: this.produto['codigo']}]);
    }
}
