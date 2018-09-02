import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { RotasComponent } from './rotas.component';
import { NewEditRotasModal } from './newEditRotas/newEditRotas.component';

@NgModule({
  imports: [
    ThemeModule
  ],
  declarations: [
    RotasComponent,
    NewEditRotasModal
  ],
  entryComponents: [
    NewEditRotasModal
  ]
})
export class RotasModule { }
