
export class Rota {

    _id = '';
    codigo = 0;
    origem = '';
    destino = '';

    constructor(prato?: Rota) {
        if (prato) {
            for (const key in prato) {
                if (prato.hasOwnProperty(key)) {
                    this[key] = prato[key];
                }
            }
        }
    }

    isValid() {
        if (this.origem && this.destino) {
            return true;
        }
        return false;
    }
}
