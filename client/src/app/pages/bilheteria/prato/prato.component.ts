import { Component, OnInit, ViewChild } from '@angular/core';
import { PratoService } from './prato.service';
import { Prato } from './prato';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { NewEditPratoModal } from './newEditPrato/newEditPrato.component';


@Component({
    selector: 'pratos-list',
    templateUrl: './prato.component.html',
    styleUrls: ['./prato.component.scss'],
    providers: [PratoService]
})
export class PratoComponent implements OnInit {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public dataSource = new MatTableDataSource();
    public displayedColumns = ['nome', 'descricao', 'acoes'];

    constructor(
        private pratoService: PratoService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.buscaPratos();
    }

    buscaPratos() {
        this.pratoService.getAllPratos()
        .then((response: Prato[]) => {
            this.dataSource.data = response;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
        .catch((err) => {
            console.log(err);
        });
    }

    deletePrato(id) {
        if (confirm('Tem certeza que deseja remover esse prato ?')) {
            this.pratoService.deletePrato(id)
            .then((response) => {
                console.log(response);
                this.buscaPratos();
                this.showMessage('Prato excluido com sucesso.');
            })
            .catch((err) => {
                this.showMessage('Erro ao excluir o prato.');
                console.log(err);
            });
        }
    }

    editPrato(prato) {
        let pratoCopy = Object.assign({}, prato);
        const dialogRef = this.dialog.open(NewEditPratoModal, {
            data: new Prato(pratoCopy),
            width: '280px'
        });
        dialogRef.afterClosed().subscribe((result: Prato | boolean) => {
            if (result) {
                this.buscaPratos();
                this.showMessage('Prato editado com sucesso.');
            }
        });
    }

    novoPrato() {
        const dialogRef = this.dialog.open(NewEditPratoModal, {
            data: new Prato(),
            width: '280px'
        });
        dialogRef.afterClosed().subscribe((result: Prato | boolean) => {
            if (result) {
                this.buscaPratos();
                this.showMessage('Prato cadastrado com sucesso.');
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
