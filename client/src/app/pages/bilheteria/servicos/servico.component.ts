import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicosService } from './servico.service';
import { Servico } from './servico';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { NewEditServicoModal } from './newEditservicos/newEditservicos.component';


@Component({
    selector: 'servicos-list',
    templateUrl: './servico.component.html',
    styleUrls: ['./servico.component.scss'],
    providers: [ServicosService]
})
export class ServicosComponent implements OnInit {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public dataSource = new MatTableDataSource();
    public displayedColumns = ['nome', 'descricao', 'acoes'];

    constructor(
        private servicosService: ServicosService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.buscaServicos();
    }

    buscaServicos() {
        this.servicosService.getAllServicos()
        .then((response: Servico[]) => {
            this.dataSource.data = response;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
        .catch((err) => {
            console.log(err);
        });
    }

    deleteServico(id) {
        if (confirm('Tem certeza que deseja remover esse serviço ?')) {
            this.servicosService.deleteServico(id)
            .then((response) => {
                console.log(response);
                this.buscaServicos();
                this.showMessage('Serviço excluido com sucesso.');
            })
            .catch((err) => {
                this.showMessage('Erro ao excluir o serviço.');
                console.log(err);
            });
        }
    }

    editServico(servico) {
        let servicoCopy = Object.assign({}, servico);
        const dialogRef = this.dialog.open(NewEditServicoModal, {
            data: new Servico(servicoCopy),
            width: '280px'
        });
        dialogRef.afterClosed().subscribe((result: Servico | boolean) => {
            if (result) {
                this.buscaServicos();
                this.showMessage('Serviço editado com sucesso.');
            }
        });
    }

    novoServico() {
        const dialogRef = this.dialog.open(NewEditServicoModal, {
            data: new Servico(),
            width: '280px'
        });
        dialogRef.afterClosed().subscribe((result: Servico | boolean) => {
            if (result) {
                this.buscaServicos();
                this.showMessage('Serviço cadastrado com sucesso.');
            }
        });
    }

    showMessage(text: string) {
        this.snackBar.open(text, 'X', {
            duration: 2500,
            direction: 'ltr',
            horizontalPosition: 'left',
            verticalPosition: 'bottom'
        });
    }

}
