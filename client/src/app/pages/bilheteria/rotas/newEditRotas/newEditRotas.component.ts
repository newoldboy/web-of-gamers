import { Component, OnInit, Inject } from '@angular/core';
import { Rota } from '../rotas';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RotasService } from '../rotas.service';


@Component({
    selector: 'new-edit-rotas',
    templateUrl: './newEditRotas.component.html',
    styleUrls: ['./newEditRotas.component.scss'],
    providers: [RotasService]
})
export class NewEditRotasModal implements OnInit {

    isEdit = false;

    constructor(
        public dialogRef: MatDialogRef<NewEditRotasModal>,
        @Inject(MAT_DIALOG_DATA) public rota: Rota,
        private rotasService: RotasService
    ) {}

    ngOnInit() {
        if (this.rota.origem) {
            this.isEdit = true;
        }
    }

    salvarRota() {
        if (this.isEdit) {
            this.rotasService.editaRota(this.rota)
            .then((response) => {
                this.dialogRef.close(response);
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            this.rotasService.salvaRota(this.rota)
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
