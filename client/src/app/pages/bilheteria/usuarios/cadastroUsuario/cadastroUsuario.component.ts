import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { ConvertKeysHelper } from '../../../../@theme/helpers/keysToLowerCase';
import { AuthService, Usuario } from '../../../../auth/auth.service';
import { UsuariosService } from '../usuarios.service';
import { element } from '@angular/core/src/render3/instructions';
import { DataSource } from '@angular/cdk/table';

export interface Grupo {
    value: number;
    viewValue: string;
}

@Component({
    selector: 'cadastro-usuario',
    styleUrls: ['./cadastroUsuario.component.scss'],
    templateUrl: './cadastroUsuario.component.html',
    providers: [UsuariosService]
})

export class CadastroUsuarioComponent implements OnInit {
    
    private configSnack: MatSnackBarConfig = {
        direction: 'ltr',
        duration: 2500,
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
    };
    private user: Usuario;
    public form: FormGroup;
    public grupos: Grupo[] = [
        {value: 2, viewValue: 'Grupo usuário'},
        {value: 3 , viewValue: 'Financeiro'},
        {value: 4 , viewValue: 'Caixas'},
        {value: 5 , viewValue: 'Compras'},
        {value: 6 , viewValue: 'Contabilidade'},
        {value: 7 , viewValue: 'Controladoria'},
        {value: 8 , viewValue: 'Estoque'},
        {value: 9 , viewValue: 'Eventos'},
        {value: 10, viewValue: ' Diretoria'},
        {value: 11, viewValue: ' Marketing'},
        {value: 12, viewValue: ' Operacional'},
        {value: 13, viewValue: ' Pousada'},
        {value: 14, viewValue: ' Projetos'},
        {value: 15, viewValue: ' RH'},
        {value: 16, viewValue: ' SAC'},
        {value: 17, viewValue: ' Ti'},
        {value: 18, viewValue: ' Juridico'},
        {value: 20, viewValue: ' FunCard'}
    ];
    public messageErro: string;
    public carregando = true;
    public password = true;
    public usuarios = [];
    public grupo;
    public ehNovo = false;
    public ehEdicao = false;
    public loading = false;
    public loadingLista = false;    
    public senhasInvalid = false;
    public vm = {
        nome: '',
        login: '',
        senha: '',
        confirmasenha: '',
        grupo: '',
        ativo: ''
    };    
    
    
    constructor(
        private usuariosService: UsuariosService,
        public snackBar: MatSnackBar,
        private auth: AuthService,
        private convertKeysHelper: ConvertKeysHelper,
        private route: Router,
        private fb: FormBuilder
    ) {
        this.form = fb.group({
            nome: new FormControl('', [ Validators.required, ]),
            login: new FormControl('', [ Validators.required, ]),
            senha: new FormControl('', [ Validators.required ]),
            confirmasenha: new FormControl('', [ Validators.required ]),
            grupo: new FormControl('', [ Validators.required ]),
            ativo: new FormControl('')
        });
    }
    
    ngOnInit() {
        this.user = this.auth.getCredentials();
        this.grupo = this.auth.getCredentials();
        this.trazUsuario();
    }
    // ---------------------------------------------------------
    // ----VERIFICA SE É EDIÇÃO OU CRIAÇÃO----------------------
    // ---------------------------------------------------------
    trazUsuario(){
        const Codigo = sessionStorage.getItem('CODIGO');
        if (Codigo !== null) {
            // EDIÇÃO
            this.usuariosService.usuario(Codigo)
            .then((response: object[]) => {
                console.log(response);                
                const infoUsuario = response;
                infoUsuario.forEach(element => {
                    console.log(element['CODIGO']);
                    this.vm = {nome: element['NOME'], login: element['LOGIN'], senha: element['SENHA'], confirmasenha: element['SENHA'], grupo: element['COD_GRUPO'], ativo: ''};  
                });                
                this.carregando = false;                
                this.ehNovo = false;
                this.ehEdicao = true;
            })
            .catch((err) => {
                console.log(err);
                this.carregando = true;
                this.messageErro = 'Ops! Ocorreu um erro no carregamento. Recarregue a página para continuar.';
            });
        } else {
            // NOVO 
            this.ehNovo = true;            
            this.carregando = false;    
            this.ehEdicao = false;
        }
    }
    deletaUsuario(usuario) {
        if (confirm('Tem certeza que deseja excluir o usuário: ' + usuario.nome)) {
            this.usuariosService.deletaUsuarios(usuario.codigo)
            .then((response) => {
                this.vm = {nome: '', login: '', senha: '', confirmasenha: '', grupo: this.grupo, ativo: ''};
                this.snackBar.open('Usuário excluído com sucesso.', 'X', this.configSnack);
            }, (err) => {
                console.log(err);
                this.snackBar.open('Infelizmente ocorreu um erro ao excluir o usuário.', 'X', this.configSnack);
            });
        }
    }
    // ---------------------------------------------------------
    // ---------------------------------------------------------
    
    // ---------------------------------------------------------
    // ----FUNÇÕES PARA EDIÇÃO/NOVO ----------------------------
    // ---------------------------------------------------------    
    salvaUsuario() {
        if (this.ehNovo === false) {
            let vmCopy = this.vm;
            this.loading = true;
            console.log(vmCopy);
            
            this.usuariosService.salvaUsuario(vmCopy)
            .then((response) => {
                this.loading = false;
                this.snackBar.open('Usuário cadastrado com sucesso.', 'X', this.configSnack);
            }, (err) => {
                this.loading = false;
                console.log(err);
                this.snackBar.open('Infelizmente ocorreu um erro ao cadastrar o usuario.', 'X', this.configSnack);
            });   
        } else {
            
        }
    } 
    
    validaSenhas() {
        if (this.vm.senha !== '' && this.vm.confirmasenha !== '') {
            if (this.vm.senha !== this.vm.confirmasenha) {
                this.senhasInvalid = true;
            } else {
                this.senhasInvalid = false;
            }
        } else if ((this.vm.senha === '') && (this.vm.confirmasenha === '')) {
            this.senhasInvalid = false;
        } else {
            this.senhasInvalid = true;
        }
    }
    
    limpaCampos(){  
        this.vm = {nome: '', login: '', senha: '', confirmasenha: '', grupo: '', ativo: ''};   
    }
    
    getConsultaUsuario(){
        this.route.navigate(['./pages/bilheteria/usuarios']);
    }
    // ---------------------------------------------------------
    // ---------------------------------------------------------
}