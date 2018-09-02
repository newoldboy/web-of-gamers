import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { MatFormFieldModule } from '@angular/material';
import { CadastroGrupoUHComponent } from './grupoUH/cadastroGrupoUH/cadastroGrupoUH.component';
import { ConsultaGrupoUHComponent } from './grupoUH/ConsultaGrupoUH/consultaGrupoUH.component';

@NgModule({
  imports: [
    ThemeModule,
    MatFormFieldModule
  ],
  declarations: [    
    CadastroGrupoUHComponent,
    ConsultaGrupoUHComponent
]
  })
  export class UnidadesHoteleirasModule { }
  