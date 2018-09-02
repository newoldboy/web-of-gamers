import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatSnackBarConfig, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnidadesHoteleirasService } from '../../unidadesHoteleiras.service';

export interface Grupo {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'cons-grupo-uh',
    styleUrls: ['./consultaGrupoUH.component.scss'],
    templateUrl: './consultaGrupoUH.component.html',
    providers: [UnidadesHoteleirasService]
})
export class ConsultaGrupoUHComponent implements OnInit {

    public carregando = true;
    public messageErro: string;
    public displayedColumns: string[] = ['codigo', 'nome'];
    public dataSource = new MatTableDataSource();
    public grupoUH = [];
    public 
    public form = new FormGroup({
        codigo: new FormControl(''),
        nome: new FormControl('')
    });
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private unidadesHoteleirasService: UnidadesHoteleirasService,
        public snackBar: MatSnackBar,
        private route: Router,
    ) { }

    ngOnInit() {
        this.buscaGrupos();
    }

    //busca os grupos p/ mostrar na tabela
    buscaGrupos() {
        this.unidadesHoteleirasService.listaGrupos()
            .then((response: object[]) => {
                const grupos = response;
                this.dataSource.data = grupos;
                // this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.carregando = false;
            })
            .catch((err) => {
                console.log(err);
                this.carregando = true;
                this.messageErro = 'Ops! Ocorreu um erro no carregamento. Recarregue a página para continuar.';
            });
    }

    //seta os valores dos campos no preview
    setaCampos(element) {
        this.form = new FormGroup({
            codigo: new FormControl({ value: element.CODIGO, disabled: true }),
            nome: new FormControl({ value: element.NOME, disabled: true }),
        });

    }

    getEditarGrupo(codigo) {
        sessionStorage.setItem('CODIGO', codigo);
        this.route.navigate(['./pages/bilheteria/c/grupoUH']);
    }

    getNovoGrupo(){
        this.route.navigate(['./pages/bilheteria/c/grupoUH']);
    }

    //filtro de pesquisa
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}