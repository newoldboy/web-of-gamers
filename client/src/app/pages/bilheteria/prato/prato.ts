
export class Prato {
    nome = '';
    descricao = '';
    imagem = '';

    constructor(prato?: Prato) {
        if (prato) {
            for (const key in prato) {
                if (prato.hasOwnProperty(key)) {
                    this[key] = prato[key];
                }
            }
        }
    }

    isValid() {
        if (this.nome && this.descricao && this.imagem) {
            return true;
        }
        return false;
    }
}
