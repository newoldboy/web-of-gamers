import { Component, OnInit, Inject } from '@angular/core';
import { Servico } from '../servico';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ServicosService } from '../servico.service';


@Component({
    selector: 'new-edit-services',
    templateUrl: './newEditservicos.component.html',
    styleUrls: ['./newEditservicos.component.scss'],
    providers: [ServicosService]
})
export class NewEditServicoModal implements OnInit {

    isEdit = false;
    imagemUp = null;

    constructor(
        public dialogRef: MatDialogRef<NewEditServicoModal>,
        @Inject(MAT_DIALOG_DATA) public servico: Servico,
        private servicosService: ServicosService
    ) {}

    ngOnInit() {
        if (this.servico.nome) {
            this.isEdit = true;
        }
    }

    salvarServico() {
        if (this.isEdit) {
            this.servicosService.editaServico(this.servico)
            .then((response) => {
                this.dialogRef.close(response);
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            let data: object = this.servico;
            data['imagemUp'] = this.imagemUp;
            this.servicosService.salvaServico(this.servico)
            .then((response) => {
                this.dialogRef.close(response);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
