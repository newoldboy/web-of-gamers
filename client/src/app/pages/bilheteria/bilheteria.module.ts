import { NgModule } from '@angular/core';

import { BilheteriaComponent } from './bilheteria.component';
import { BilheteriaRoutingModule } from './bilheteria-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { ProdutoModule } from './produto/produto.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PratosModule } from './prato/prato.module';
import { ServicosModule } from './servicos/servico.module';
import { RotasModule } from './rotas/rotas.module';
import { MatTableModule } from '@angular/material';
import { UnidadesHoteleirasModule } from './unidades-hoteleiras/unidadesHoteleiras.module';


const PAGES_COMPONENTS = [
  BilheteriaComponent,
];

@NgModule({
  imports: [
    BilheteriaRoutingModule,
    ThemeModule,
    ProdutoModule,
    UsuariosModule,
    PratosModule,
    ServicosModule,
    RotasModule,
    MatTableModule,
    UnidadesHoteleirasModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class BilheteriaModule {}
