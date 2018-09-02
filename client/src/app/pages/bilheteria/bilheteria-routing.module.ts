import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BilheteriaComponent } from './bilheteria.component';
import { ProdutoComponent } from './produto/produto.component';
import { AltProdutoComponent } from './produto/alt/alt-produto.component';
import { PratoComponent } from './prato/prato.component';
import { ServicosComponent } from './servicos/servico.component';
import { RotasComponent } from './rotas/rotas.component';
import { ConsultaUsuarioComponent } from './usuarios/consultaUsuario/consultaUsuario.component';
import { CadastroUsuarioComponent } from './usuarios/cadastroUsuario/cadastroUsuario.component';
import { CadastroGrupoUHComponent } from './unidades-hoteleiras/grupoUH/cadastroGrupoUH/cadastroGrupoUH.component';
import { ConsultaGrupoUHComponent } from './unidades-hoteleiras/grupoUH/ConsultaGrupoUH/consultaGrupoUH.component';



const routes: Routes = [{
  path: '',
  component: BilheteriaComponent,
  children: [
  {
    path: 'produtos',
    component: ProdutoComponent,
  }, 
  {
    path: 'produto',
    component: AltProdutoComponent,
  }, 
  {
    path: 'pratos',
    component: PratoComponent,
  }, 
  {
    path: 'servicos',
    component: ServicosComponent,
  }, 
  {
    path: 'rotas',
    component: RotasComponent,
  }, 
  {
    path: 'usuarios',
    component: ConsultaUsuarioComponent,
  }, 
  {
    path: 'c/usuarios',
    component: CadastroUsuarioComponent,
  }, 
  {
    path: 'c/grupoUH',
    component: CadastroGrupoUHComponent,
  }, 
    {
      path: 'gruposUH',
      component: ConsultaGrupoUHComponent,
    },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  }, 
  {
    path: '**',
    redirectTo: 'main',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class BilheteriaRoutingModule { }

export const routedComponents = [
  ProdutoComponent,
  AltProdutoComponent,
];
