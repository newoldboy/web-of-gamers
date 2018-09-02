import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Produto } from '../produto';
import { PratoService } from '../../prato/prato.service';
import { Prato } from '../../prato/prato';
import { NewEditPratoModal } from '../../prato/newEditPrato/newEditPrato.component';
import { NewEditServicoModal } from '../../servicos/newEditservicos/newEditservicos.component';
import { Servico } from '../../servicos/servico';
import { ServicosService } from '../../servicos/servico.service';
import { Rota } from '../../rotas/rotas';
import { RotasService } from '../../rotas/rotas.service';


@Component({
    selector: 'alt-produto',
    templateUrl: './alt-produto.component.html',
    styleUrls: ['./alt-produto.component.scss'],
    providers: [ProdutoService, PratoService, ServicosService, RotasService]
})
export class AltProdutoComponent implements OnInit {

    public produto = new Produto();
    public isOtherTours = false;
    public noIsOtherTours = true;

    public tipoProduto = 0;

    public imagensForUp = [];
    public nameImagensForUp = [];

    public auxCodClasse = '';

    public disabledActive = false;
    public disabled = false;

    public useManagerInfo = false;
    public noUseManagerInfo = false;

    public pratosDoProduto = [];
    public temPrato = false;
    public pratos: Prato[];

    public servicosDoProduto = [];
    public temServico = false;
    public servicos: Servico[];

    public rotas: Rota[];

    constructor(
        private produtoService: ProdutoService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private pratoService: PratoService,
        private servicosService: ServicosService,
        private rotasService: RotasService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.getProductById(params['id']);
            } else {
                this.voltar();
            }
        });
        this.buscaRotas();
        this.buscaPratos();
        this.buscaServicos();
    }

    // Função chamada no carregamento de qualquer foto.
    async loadImagens(files, classe?) {
        if (classe) { // Diferencição das fotos das classe para as fotos dos produtos
            if ((files[0]['size'] / 1024) > 3072) {
                this.showSnackBar('A foto não pode passar de 3Mb.');
            } else {
                this.auxCodClasse = classe.codigo;
                let reader = new FileReader();
                await reader.readAsDataURL(files[0]);
                reader.onload = await this.converteFotoClasse;
                classe.imagem[0] = ('img/classes/' + (files[0]['name'].replace(/ /g, '').replace(/-/g, '')));
            }
        } else {
            let imagens = this.produto.imagens;
            for (let i = 0; i < files.length; i++) {
                if ((files[i]['size'] / 1024) > 3072) {
                    this.showSnackBar('A foto não pode passar de 3Mb.');
                } else {
                    let reader = new FileReader();
                    await reader.readAsDataURL(files[i]);
                    reader.onload = await this.converteFoto;
                    imagens.push(('img/passeios/' + (files[i]['name'].replace(/ /g, '').replace(/-/g, ''))));
                    this.nameImagensForUp.push(files[i]['name'].replace(/ /g, '').replace(/-/g, ''));
                }
            }
            this.produto.imagens = imagens;
        }
    }

    // Salva a foto da classe
    converteFotoClasse = (event: ProgressEvent) => {
        for (let i = 0; i < this.produto.classes.length; i++) {
            if (this.auxCodClasse === this.produto.classes[i].codigo) {
                this.produto.classes[i].imagemUp = event.target['result'];
                break;
            }
        }
        for (let i = 0; i < this.produto.classes.length; i++) {
            let id = 'fileInputClasse' + i;
            let element = document.getElementById(id);
            element['value'] = '';
        }
        return;
    }

    // Remove a foto da calsse
    removeFotoClasse(classe) {
        classe.imagem[0] = '';
        classe.imagemUp = '';
    }

    // Salva as fotos do passeio
    converteFoto = (event: ProgressEvent) => {
        this.imagensForUp.push(event.target['result']);
        if (this.imagensForUp.length === this.produto.imagens.length) {
            let element = document.getElementById('fileInput');
            element['value'] = '';
        }
        return;
    }

    // Remove uma foto do passeio
    removeFoto(index) {
        let imagens = this.produto.imagens;
        imagens.splice(index, 1);
        this.nameImagensForUp.splice(index, 1);
        this.produto.imagens = imagens;
        this.imagensForUp.splice(index, 1);
    }

    // Função auxiliar que é usada para mostrar o nome da imagem sem o caminho e sem o hash
    getNameImagens(img: string): string {
        if (img) {
            let arr = img.split('/');
            let name = (arr[(arr.length - 1)]).split('-');
            return (name[name.length - 1]);
        }
    }

    compareRoutes(r1: any, r2: any): boolean {
        return r1._id === r2._id;
    }

    buscaRotas() {
        this.rotasService.getAllRotas()
        .then((response: Rota[]) => {
            this.rotas = response;
        })
        .catch((err) => {
            console.log(err);
        });
    }

    // Buscaos pratos que estão cadastrados para serem vinculados com o produto
    buscaPratos() {
        this.pratoService.getAllPratos()
        .then((response: Prato[]) => {
            this.pratos = response;
        })
        .catch((err) => {
            console.log(err);
        });
    }

    // Abre o modal de cadastro de prato
    novoPrato() {
        const dialogRef = this.dialog.open(NewEditPratoModal, {
            data: new Prato(),
            width: '280px'
        });
        dialogRef.afterClosed().subscribe((result: Prato | boolean) => {
            if (result) {
                this.buscaPratos();
                this.showSnackBar('Prato cadastrado com sucesso.');
            }
        });
    }

    // Busca os serviços que estão cadastrados
    buscaServicos() {
        this.servicosService.getAllServicos()
        .then((response: Servico[]) => {
            this.servicos = response;
        })
        .catch((err) => {
            console.log(err);
        });
    }

    // Abre o modal para cadastro de novo serviço
    novoServico() {
        const dialogRef = this.dialog.open(NewEditServicoModal, {
            data: new Servico(),
            width: '280px'
        });
        dialogRef.afterClosed().subscribe((result: Servico | boolean) => {
            if (result) {
                this.buscaPratos();
                this.showSnackBar('Serviço cadastrado com sucesso.');
            }
        });
    }

    // Função usada para incluir um novo item na classe criando assim um novo input de item
    adcionarClasse(classe, value) {
        classe.itensInclusos.push({
            descricao: '',
            incluso: value
        });
    }

    // Remove um dos item da classe
    removeItem(classe, i) {
        classe.itensInclusos.splice(i, 1);
    }

    // Busca o produto pelo id passado por parametro na url
    getProductById(id) {
        this.produtoService.getProductById(id)
        .then((response: Produto) => {
            this.produto = new Produto(response);
            this.isOtherTours = this.produto.isOtherTours;
            this.noIsOtherTours = !this.produto.isOtherTours;
            this.temPrato = this.produto.pratos.length ? true : false;
            this.temServico = this.produto.servicos.length ? true : false;
            this.pratosDoProduto = this.produto.pratos.map((prato) => prato['_id']);
            this.servicosDoProduto = this.produto.servicos.map((servico) => servico['_id']);
            this.tipoProduto = ((this.produto.isTicket ? 1 : this.produto.isPackage ? 2 : this.produto.isLitorina ? 3 : this.produto.isThematic ? 4 : 0));
            this.noUseManagerInfo = this.produto.useManagerInfo ? false : true;
            this.useManagerInfo = !this.noUseManagerInfo;
            this.trocaTipo();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    trocaTipo() {
        this.produto.isTicket = false;
        this.produto.isPackage = false;
        this.produto.isLitorina = false;
        this.produto.isThematic = false;

        switch (this.tipoProduto) {
            case 1:
                this.produto.isTicket = true;
                this.tipoProduto = 1;
            break;
            case 2:
                this.produto.isPackage = true;
                this.tipoProduto = 2;
            break;
            case 3:
                this.produto.isLitorina = true;
                this.tipoProduto = 3;
            break;
            case 4:
                this.produto.isThematic = true;
                this.tipoProduto = 4;
            break;
            default:
                this.produto.isTicket = true;
                this.tipoProduto = 1;
            break;
        }
    }

    // Faz toda a validação do produto e retorna true para invalido e false para valido
    validaProduto(): boolean {
        this.disabledActive = true;
        if (!this.produto.descricaoManager) {
            this.showSnackBar('Por favor Informe a descrição.');
            return true;
        }
        if (!this.produto.imagens.length) {
            this.showSnackBar('Por favor selecione as imagens do passeio.');
            return true;
        }
        if (this.produto.imagens.length < 5) {
            this.showSnackBar('Por favor selecione pelo menos 5 imagens.');
            return true;
        }
        if (this.produto.useManagerInfo && !this.produto.nameManager) {
            this.showSnackBar('Por favor informe o nome do passeio.');
            return true;
        }
        if (!this.produto.rota._id) {
            this.showSnackBar('Por favor selecione uma rota.');
            return true;
        }
        if (this.temPrato && this.pratosDoProduto.length === 0) {
            this.showSnackBar('Informe pelo menos um prato para esse produto.');
            return true;
        }
        if (this.temServico && this.servicosDoProduto.length === 0) {
            this.showSnackBar('Informe pelo menos um serviço para esse produto.');
            return true;
        }
        let classesOk = true;
        let nomeClasse = '';
        for (let i = 0; i < this.produto.classes.length; i++) {
            if (this.produto.classes[i].codigo && !this.produto.classes[i].imagem[0]) {
                classesOk = false;
                nomeClasse = this.produto.classes[i].nome;
            }
        }
        if (this.tipoProduto === 4 && this.produto.diurnoNoturno === 0) {
            this.showSnackBar('Por favor informe o horario.');
            return true;
        }
        if (!classesOk) {
            this.showSnackBar('Selecione uma foto para a classe ' + nomeClasse);
            return true;
        }
        this.disabledActive = false;
        return false;
    }

    // Salva todas as alterações do produto
    salvarAlteracoes(ativar?) {
        if (!this.validaProduto()) {
            this.disabled = true;
            this.produto.active = ativar === true || ativar === false ? ativar : this.produto.active;
            for (let i = 0; i < this.produto.classes.length; i++) {
                for (let j = 0; j < this.produto.classes[i].itensInclusos.length; j++) {
                    if (!(this.produto.classes[i].itensInclusos[j].descricao)) {
                        (this.produto.classes[i].itensInclusos).splice(j, 1);
                        j--;
                    }
                }
            }
            this.produto.isOtherTours = this.isOtherTours;
            this.produto.pratos = this.pratosDoProduto;
            this.produto.servicos = this.servicosDoProduto;
            this.produto.useManagerInfo = this.useManagerInfo;
            this.produtoService.salvaAlteracaoProduto(this.produto._id, this.produto, [this.imagensForUp, this.nameImagensForUp])
            .then((response) => {
                console.log(response);
                this.imagensForUp = [];
                this.nameImagensForUp = [];
                this.showSnackBar('Alterações salvas com sucesso.');
                this.getProductById(this.produto.codigo);
                this.disabled = false;
            })
            .catch((err) => {
                this.showSnackBar('Ocorreu um erro ao salvar as aterações.');
                console.log(err);
            });
        }
    }

    // Mostra as mensagem informativas para o usuario
    showSnackBar(mensagem: string) {
        this.snackBar.open(mensagem, 'X', {
            duration: 2000,
            direction: 'ltr',
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            panelClass: 'snackbar-mobile',
            politeness: 'assertive',
        });
    }

    // Retorna para a pagina de listagem de produtos
    voltar() {
        this.router.navigate(['./pages/bilheteria/produtos']);
    }
}
