import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from './produto.service';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


@Component({
    selector: 'produto',
    templateUrl: './produto.component.html',
    styleUrls: ['./produto.component.scss'],
    providers: [ProdutoService]
})
export class ProdutoComponent implements OnInit {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public dataSource = new MatTableDataSource();
    public displayedColumns = ['codigo', 'name', 'tipo', 'destaque', 'active', 'acoes'];
    public sincronizando = false;
    public produtoSelecionado = {};
    public abrePreview = false;
    public historico = {};

    constructor(
        private produtoService: ProdutoService, private route: Router, private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.getAllProducts();
        this.getHistoricoSinc();
    }

    getAllProducts() {
        this.produtoService.getAllProducts()
            .then((response: object[]) => {
                this.dataSource.data = response;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getHistoricoSinc() {
        this.produtoService.historicoSincronizacao()
        .then((response: object) => {
            this.historico = response;
        })
        .catch((err) => {
            console.log(err);
        });
    }

    syncProds() {
        if (!this.sincronizando) {
            this.sincronizando = true;
            this.produtoService.sincronizaProdutos()
            .then((response) => {
                this.sincronizando = false;
                this.showMessage('Sincronização feita com sucesso.');
                this.getAllProducts();
                this.getHistoricoSinc();
            })
            .catch((err) => {
                console.log(err);
                this.sincronizando = false;
                this.showMessage('Erro ao sincronizar os produtos.');
            });
        }
    }

    fixedTable() {
        let pos = window['pageYOffset'];
        let element = document.getElementById('tableHeader');
        if (element) {
            let distancia = element.offsetTop + 50;
            if (pos >= distancia) {
                return true;
            }
        }
        return false;
    }

    showMessage(text: string) {
        this.snackBar.open(text, 'X', {
            duration: 2500,
            direction: 'ltr',
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
        });
    }

    goAltProduto(id) {
        if (!this.sincronizando) {
            this.route.navigate(['./pages/bilheteria/produto', {id: id}]);
        }
    }
}
