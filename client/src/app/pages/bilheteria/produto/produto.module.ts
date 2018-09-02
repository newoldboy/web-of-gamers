import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { ProdutoComponent } from './produto.component';
import { AltProdutoComponent } from './alt/alt-produto.component';
import { PreviewProdutoComponent } from './previewProduto/previewProduto.component';
import { PratosModule } from '../prato/prato.module';
import { ServicosModule } from '../servicos/servico.module';
import { RotasModule } from '../rotas/rotas.module';

@NgModule({
  imports: [
    ThemeModule,
    PratosModule,
    ServicosModule,
    RotasModule
  ],
  declarations: [
    ProdutoComponent,
    AltProdutoComponent,
    PreviewProdutoComponent,
  ],
})
export class ProdutoModule { }
