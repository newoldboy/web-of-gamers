import { Component, OnInit, ViewChild } from '@angular/core';
import { RotasService } from './rotas.service';
import { Rota } from './rotas';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { NewEditRotasModal } from './newEditRotas/newEditRotas.component';


@Component({
    selector: 'rotas-list',
    templateUrl: './rotas.component.html',
    styleUrls: ['./rotas.component.scss'],
    providers: [RotasService]
})
export class RotasComponent implements OnInit {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public dataSource = new MatTableDataSource();
    public displayedColumns = ['origem', 'destino', 'acoes'];

    constructor(
        private rotasService: RotasService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.buscaRotas();
    }

    buscaRotas() {
        this.rotasService.getAllRotas()
        .then((response: Rota[]) => {
            this.dataSource.data = response;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
        .catch((err) => {
            console.log(err);
        });
    }

    deleteRota(id) {
        if (confirm('Tem certeza que deseja remover essa rota ?')) {
            this.rotasService.deleteRota(id)
            .then((response) => {
                console.log(response);
                this.buscaRotas();
                this.showMessage('Rota excluida com sucesso.');
            })
            .catch((err) => {
                this.showMessage('Erro ao excluir a rota.');
                console.log(err);
            });
        }
    }

    editRota(rota) {
        let rotaCopy = Object.assign({}, rota);
        const dialogRef = this.dialog.open(NewEditRotasModal, {
            data: new Rota(rotaCopy),
            width: '280px'
        });
        dialogRef.afterClosed().subscribe((result: Rota | boolean) => {
            if (result) {
                this.buscaRotas();
                this.showMessage('Rota editado com sucesso.');
            }
        });
    }

    novaRota() {
        const dialogRef = this.dialog.open(NewEditRotasModal, {
            data: new Rota(),
            width: '280px'
        });
        dialogRef.afterClosed().subscribe((result: Rota | boolean) => {
            if (result) {
                this.buscaRotas();
                this.showMessage('Rota cadastrado com sucesso.');
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
