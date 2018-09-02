import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { ServicosComponent } from './servico.component';
import { NewEditServicoModal } from './newEditservicos/newEditservicos.component';

@NgModule({
  imports: [
    ThemeModule
  ],
  declarations: [
    ServicosComponent,
    NewEditServicoModal
  ],
  entryComponents: [
    NewEditServicoModal
  ]
})
export class ServicosModule { }
