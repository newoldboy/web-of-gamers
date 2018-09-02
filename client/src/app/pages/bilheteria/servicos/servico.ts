
export class Servico {
    nome = '';
    descricao = '';

    constructor(prato?: Servico) {
        if (prato) {
            for (const key in prato) {
                if (prato.hasOwnProperty(key)) {
                    this[key] = prato[key];
                }
            }
        }
    }

    isValid() {
        if (this.nome && this.descricao) {
            return true;
        }
        return false;
    }
}
