import { NgModule } from '@angular/core';
import { PreviewMenuComponent } from './preview-menu.component';
import { PreviewButtonComponent } from './preview-button/preview-button.component';
import { PreviewTituloComponent } from './preview-titulo/preview-titulo.component';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule
    ],
    declarations: [      
        PreviewTituloComponent,
        PreviewButtonComponent,
        PreviewMenuComponent
    ],
    exports: [
        PreviewTituloComponent,
        PreviewButtonComponent,
        PreviewMenuComponent
    ]
})
export class PreviewMenuModule {}
