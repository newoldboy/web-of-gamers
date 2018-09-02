import { Component, OnInit, Inject } from '@angular/core';
import { Prato } from '../prato';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PratoService } from '../prato.service';


@Component({
    selector: 'new-edit-dish',
    templateUrl: './newEditPrato.component.html',
    styleUrls: ['./newEditPrato.component.scss'],
    providers: [PratoService]
})
export class NewEditPratoModal implements OnInit {

    isEdit = false;
    imagemUp = null;

    constructor(
        public dialogRef: MatDialogRef<NewEditPratoModal>,
        @Inject(MAT_DIALOG_DATA) public prato: Prato,
        private pratoService: PratoService
    ) {}

    ngOnInit() {
        if (this.prato.nome) {
            this.isEdit = true;
        }
    }

    removeFoto() {
        this.imagemUp = null;
        this.prato.imagem = '';
    }

    salvarPrato() {
        if (this.isEdit) {
            let data: object = this.prato;
            data['imagemUp'] = ((this.imagemUp) ? this.imagemUp : null);
            this.pratoService.editaPrato(this.prato)
            .then((response) => {
                this.dialogRef.close(response);
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            let data: object = this.prato;
            data['imagemUp'] = this.imagemUp;
            this.pratoService.salvaPrato(this.prato)
            .then((response) => {
                this.dialogRef.close(response);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    getNameImagens(img: string): string {
        let arr = img.split('/');
        let name = (arr[(arr.length - 1)]).split('-');
        return (name[name.length - 1]);
    }

    converteFoto = (event) => {
        this.imagemUp = event.target.result;
        let element = document.getElementById('file');
        element['value'] = '';
    }

    disabledForm(): boolean {
        if (!this.prato.nome || !this.prato.descricao || !this.prato.descricao) {
            return true;
        }
        return false;
    }

    loadImagens(files) {
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = this.converteFoto;
        this.prato.imagem = (('img/pratos/' + files[0]['name']));
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
