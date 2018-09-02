import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatSnackBarConfig, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService, Usuario } from '../../../../auth/auth.service';
import { UsuariosService } from '../usuarios.service';
import { ConvertKeysHelper } from '../../../../@theme/helpers/keysToLowerCase';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface Grupo {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'cons-usuarios',
    styleUrls: ['./consultaUsuario.component.scss'],
    templateUrl: './consultaUsuario.component.html',
    providers: [UsuariosService]
})
export class ConsultaUsuarioComponent implements OnInit {
    
    public grupos: Grupo[] = [
        {value: 'admin', viewValue: 'Administrador'},
        {value: 'comum', viewValue: 'Comum'}
    ];
    
    public carregando = true;
    public messageErro: string;
    public password = true;
    public disabledInput = true;
    private user: Usuario;
    public grupo;
    public displayedColumns: string[] = ['codigo', 'nome', 'ativo', 'classe'];
    public dataSource =  new MatTableDataSource();
    public usuarios = [];
    public vm = {
        codigo: null,
        nome: '',
        login: '',
        senha: '',
        categoria: '',
        grupo: '',
    };
    public form: FormGroup;
    
    constructor(
        private usuariosService: UsuariosService,
        public snackBar: MatSnackBar,
        private auth: AuthService,
        private route: Router,
    ) {}
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    
    ngOnInit() {
        this.user = this.auth.getCredentials();
        this.grupo = this.auth.getCredentials();
        this.habilitaNovoUsuario();    
        this.buscaUsuarios();
        sessionStorage.removeItem('CODIGO');
    }
    
    buscaUsuarios(){
        this.usuariosService.listaUsuarios()
        .then((response: object[]) => {
            const usuarios = response;
            this.dataSource.data = usuarios;
            this.dataSource.paginator = this.paginator;
            this.carregando = false;
        })
        .catch((err) => {
            console.log(err);
            this.carregando = true;
            this.messageErro = 'Ops! Ocorreu um erro no carregamento. Recarregue a página para continuar.';
        });
    }
    
    habilitaNovoUsuario () {
        this.form = new FormGroup({
            nome: new FormControl(''),
            login: new FormControl(''),
            senha: new FormControl(''),
            grupo: new FormControl(''),
            ativo: new FormControl(''),
            codigo: new FormControl('')
        });
        this.vm = { codigo: null, nome: '', login: '', senha: '', categoria: '', grupo: this.grupo, };
    }
    
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    
    setaCampos(element){    
        const ativo = element.ATIVO;   
        if (ativo === 'S') {                 
            this.form = new FormGroup({
                codigo: new FormControl({value: element.CODIGO, disabled: true}),
                nome: new FormControl({value: element.NOME, disabled: true}),
                login: new FormControl({value: element.LOGIN, disabled: true}),
                senha: new FormControl({value: element.SENHA , disabled: true}),
                grupo: new FormControl({value: element.GRUPO, disabled: true}),
                ativo: new FormControl({value: 'true', disabled: true}),
            });
        } else {
            this.form = new FormGroup({
                codigo: new FormControl({value: element.CODIGO, disabled: true}),
                nome: new FormControl({value: element.NOME, disabled: true}),
                login: new FormControl({value: element.LOGIN, disabled: true}),
                senha: new FormControl({value: element.SENHA, disabled: true}),
                grupo: new FormControl({value: element.GRUPO, disabled: true}),
                ativo: new FormControl({value: '', disabled: true}),
            });
        }
    }
    
    getEditarUsuario(codigo){     
        sessionStorage.setItem('CODIGO', codigo);
        this.route.navigate(['./pages/bilheteria/c/usuarios']);   
    }
    getCadastrarUsuario(){ 
        this.route.navigate(['./pages/bilheteria/c/usuarios']);  
    }
}