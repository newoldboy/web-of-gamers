import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';
import { ConsultaUsuarioComponent } from './consultaUsuario/consultaUsuario.component';
import { CadastroUsuarioComponent } from './cadastroUsuario/cadastroUsuario.component';
import { MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [
    ThemeModule,
    MatFormFieldModule
  ],
  declarations: [    
    ConsultaUsuarioComponent,
    CadastroUsuarioComponent]
  })
  export class UsuariosModule { }
  