import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UnidadesHoteleirasService } from '../../unidadesHoteleiras.service';


@Component({
    selector: 'cadastroGrupoUH',
    styleUrls: ['./cadastroGrupoUH.component.scss'],
    templateUrl: './cadastroGrupoUH.component.html',
    providers: [UnidadesHoteleirasService]
})
export class CadastroGrupoUHComponent implements OnInit {
    public categorias = [];
    public form: FormGroup;
    public vm = {
        nome: ''
    };

    private configSnack: MatSnackBarConfig = {
        direction: 'ltr',
        duration: 2500,
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
    };
    constructor(
        private unidadesHoteleirasService: UnidadesHoteleirasService,
        public snackBar: MatSnackBar,
        private route: Router
    ) { }


    ngOnInit() {
        this.form = new FormGroup({
            nome: new FormControl('', ([Validators.required]))
        });
    }

    //função p/ salvar grupo
    salvarGrupo() {
        this.unidadesHoteleirasService.salvaGrupo(this.form.value)
            .then((response) => {
                this.snackBar.open('Grupo cadastrado com sucesso!', 'X', this.configSnack);
            }, (err) => {
                console.log(err);
                this.snackBar.open('Erro ao cadastrar o grupo!', 'X', this.configSnack);
            });
        
    }

    //limpa os campos
    limpaCampos() {
        this.vm = { nome: '' };
    }

    getConsultaGrupos() {
        this.route.navigate(['./pages/bilheteria/gruposUH']);
    }
}