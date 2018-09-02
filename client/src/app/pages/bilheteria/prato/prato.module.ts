import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { PratoComponent } from './prato.component';
import { NewEditPratoModal } from './newEditPrato/newEditPrato.component';

@NgModule({
  imports: [
    ThemeModule
  ],
  declarations: [
    PratoComponent,
    NewEditPratoModal
  ],
  entryComponents: [
    NewEditPratoModal
  ]
})
export class PratosModule { }
