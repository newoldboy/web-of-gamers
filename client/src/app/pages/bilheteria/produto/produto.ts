import { Rota } from '../rotas/rotas';

export class Produto {
    _id = null;
    codigo = '';
    nameBilheteria = '';
    nameManager = '';
    descricaoManager = '';
    useManagerInfo = true;
    grupoBilhete = '';
    nomeGrupoBilhete = '';
    temporada = '';
    hasPromotion = '';
    isOtherTours = false;
    isTicket = false;
    isPackage = false;
    isThematic = false;
    isLitorina = false;
    diurnoNoturno = 0;
    sku = '';
    slug = '';
    uid = '';
    avaliacao = 0;
    valorMinimo = 0;
    nameLower = '';
    idadeMinima = '';
    status = '';
    duracao = '';
    destaque = '';
    origem = '';
    destino = '';
    vagoes = '';
    servicos: string[] = [];
    pratos: string[] = [];
    imagens: string[] = [];
    imagemPrincipal = 0;
    classes: Classe[] = [new Classe()];
    active = false;
    rota: Rota = new Rota();

    constructor(produto?: Produto) {
        if (produto) {
            for (const key in produto) {
                if (produto.hasOwnProperty(key)) {
                    if (key === 'classes') {
                        this.classes = [];
                        for (let i = 0; i < produto[key].length; i++) {
                            this.classes.push(new Classe(produto[key][i]));
                        }
                    } else {
                        this[key] = produto[key];
                    }
                }
            }
        }
    }
}

class Classe {
    codigo = '';
    nome = '';
    categorias: Categoria[] = [new Categoria()];
    valorMinimo = 0;
    imagem = '';
    descricao = '';
    infoExtra = '';
    aviso = '';
    itensInclusos = [{
        descricao: '',
        incluso: true,
    }];
    imagemUp = '';
    active = true;

    constructor(classe?: Classe) {
        if (classe) {
            for (const key in classe) {
                if (classe.hasOwnProperty(key)) {
                    if (key === 'categorias') {
                        this.categorias = [];
                        for (let i = 0; i < classe[key].length; i++) {
                            this.categorias.push(new Categoria(classe[key][i]));
                        }
                    } else {
                        this[key] = classe[key];
                    }
                }
            }
        }
    }
}

class Categoria {
    codigo = '';
    nome = '';
    idade = '';
    descricaoIdade = '';
    codReceita = 0;
    receitas: Receita[] = [new Receita()];
    itensPacotes: ItemPacote[] = [new ItemPacote()];
    totalReceita = 0;
    active = true;

    constructor(categoria?: Categoria) {
        if (categoria) {
            for (const key in categoria) {
                if (categoria.hasOwnProperty(key)) {
                    if (key === 'receitas') {
                        this.receitas = [];
                        for (let i = 0; i < categoria[key].length; i++) {
                            this.receitas.push(new Receita(categoria[key][i]));
                        }
                    } else if (key === 'itensPacotes') {
                        this.itensPacotes = [];
                        for (let i = 0; i < categoria[key].length; i++) {
                            this.itensPacotes.push(new ItemPacote(categoria[key][i]));
                        }
                    } else {
                        this[key] = categoria[key];
                    }
                }
            }
        }
    }
}

class ItemPacote {
    codigo = '';
    nome = '';
    valor = 0;
    active = true;
    receitas: Receita[] = [new Receita()];

    constructor(itemPacote?: ItemPacote) {
        if (itemPacote) {
            for (const key in itemPacote) {
                if (itemPacote.hasOwnProperty(key)) {
                    if (key === 'receitas') {
                        this.receitas = [];
                        for (let i = 0; i < itemPacote[key].length; i++) {
                            this.receitas.push(new Receita(itemPacote[key][i]));
                        }
                    } else {
                        this[key] = itemPacote[key];
                    }
                }
            }
        }
    }
}

class Receita {
    codigo = '';
    nome = '';
    valor = 0;
    active = true;

    constructor(receita?: Receita) {

        if (receita) {
            for (const key in receita) {
                if (receita.hasOwnProperty(key)) {
                    this[key] = receita[key];
                }
            }
        }
    }
}
