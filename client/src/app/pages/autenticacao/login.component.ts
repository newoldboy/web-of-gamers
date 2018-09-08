import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { LoginService } from './login.service';
import { AuthService } from '../../auth/auth.service';
import { API_CONFIG } from '../../app.setings';

@Component({
    selector: 'e-manager-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [LoginService, AuthService],
})
export class LoginComponent implements OnInit {
    
    public mensagem = '';
    public model: any = {};
    public loading = false;
    private returnUrl: string;
    public cardForm: FormGroup;
    public password = true;
    
    constructor(private loginService: LoginService,
        private router: Router,
        private authService: AuthService,
        private fb: FormBuilder
    ) {
        
    this.cardForm = fb.group({
        login: ['', Validators.required],
        senha: ['', Validators.required]
      });
    }
    
    ngOnInit() {
        document.getElementById('nb-global-spinner').style.display = 'none';
        sessionStorage.clear();
    }
    
    public logar() {
        this.mensagem = '';
        this.loading = true;
        
        
        this.loginService
        .login({ usuario: this.cardForm.value.usuario, senha: this.cardForm.value.senha })
        .then((response) => {
            this.authService.clearCredentials();
            if (this.authService.setToken(response)) {
                const dados = response;
                if (this.authService.setCredentials(dados)) {
                    this.router.navigate(['pages/dashboard']);
                }
            }
        })
        .catch(err => {
            this.loading = false;
            this.mensagem = 'Usuário ou senha incorretos';
        });
    }
}


