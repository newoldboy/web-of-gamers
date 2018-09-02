import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService, Usuario } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';




@Component({
    selector: 'toolbar-menu',
    templateUrl: 'toolbar-menu.component.html',
    styleUrls: ['toolbar-menu.component.scss']
})

export class ToolbarMenuComponent implements OnInit {

    usuario;
    sidenavOpen = true;
    abreMenu = true;
    menuGrande = true; 
    modoMenu = 'push';
    @ViewChild('sidenav') sidenav: MatSidenav;

    constructor(private auth: AuthService, private route: Router) { }

    ngOnInit() {
        this.usuario = this.auth.getCredentials().session.usuario;
        this.verificaMenu();
    }

    /* INICIO */
    goHome() {
        this.route.navigate(['./pages/dashboard']);
    }

    /* CADASTROS */
    goCadastroReservas() {
        this.route.navigate(['./pages/bilheteria/c/reservas']);
    }
    goCadastroHospedes() {
        this.route.navigate(['./pages/bilheteria/c/hospedes']);
    }
    goCadastroClientes() {
        this.route.navigate(['./pages/bilheteria/c/clientes']);
    }
    goCadastroCartoes() {
        this.route.navigate(['./pages/bilheteria/c/cartoes']);
    }
    goCadastroContaConsumo() {
        this.route.navigate(['./pages/bilheteria/c/contaConsumo']);
    }
    goCadastroUsuarios() {
        this.route.navigate(['./pages/bilheteria/c/usuarios']);
    }
    goCadastroFuncionarios() {
        this.route.navigate(['./pages/bilheteria/c/funcionarios']);
    }
    goCadastroEscalaServico() {
        this.route.navigate(['./pages/bilheteria/c/escalas']);
    }
    goCadastroUH() {
        this.route.navigate(['./pages/bilheteria/c/unidades']);
    }
    goCadastroGruposUH() {
        this.route.navigate(['./pages/bilheteria/c/grupoUH']);
    }
    goCadastroCategoriaUH() {
        this.route.navigate(['./pages/bilheteria/c/categoriasUH']);
    }
    goCadastroOrdemServico() {
        this.route.navigate(['./pages/bilheteria/c/ordemServico']);
    }

    /* CONSULTAS */
    goQuartosDisponiveis() {
        this.route.navigate(['./pages/bilheteria/quartos-disponiveis']);
    }
    goReservas() {
        this.route.navigate(['./pages/bilheteria/reservas']);
    }
    goHospedes() {
        this.route.navigate(['./pages/bilheteria/hospedes']);
    }
    goClientes() {
        this.route.navigate(['./pages/bilheteria/clientes']);
    }
    goCartoes() {
        this.route.navigate(['./pages/bilheteria/cartoes']);
    }
    goContaConsumo() {
        this.route.navigate(['./pages/bilheteria/conta-consumo']);
    }
    goUsuarios() {
        this.route.navigate(['./pages/bilheteria/usuarios']);
    }
    goFuncionarios() {
        this.route.navigate(['./pages/bilheteria/funcionarios']);
    }
    goEscalas() {
        this.route.navigate(['./pages/bilheteria/escalas']);
    }
    goUnidades() {
        this.route.navigate(['./pages/bilheteria/unidades']);
    }
    goGruposUH() {
        this.route.navigate(['./pages/bilheteria/gruposUH']);
    }
    goCategoriasUH() {
        this.route.navigate(['./pages/bilheteria/categoriasUH']);
    }
    goOrdensServico() {
        this.route.navigate(['./pages/bilheteria/ordens']);
    }

    /* OUTROS */
    goFechamentoCartao() {
        this.route.navigate(['./pages/bilheteria/fechamento']);
    }

    /* RELATORIOS */
    goRelatorioVendas() {
        this.route.navigate(['./pages/relatorio/vendas']);
    }
    goRelatorioConferencia() {
        this.route.navigate(['./pages/relatorio/conferencias']);
    }

    /* SAIR */
    sair() {
        this.auth.clearCredentials();
    }

    /* END */
    onOpenedChange() {
        this.sidenavOpen = !this.sidenavOpen;
    }

    verificaMenu() {
        if (window.innerWidth < 768) {
            this.menuGrande = false;
            this.modoMenu = 'over';
        } else{
            this.menuGrande = true;
            this.modoMenu = 'push';
        }
        
    }

    diminuiMenu(){
        this.menuGrande = !this.menuGrande;
       

        
    }
}
