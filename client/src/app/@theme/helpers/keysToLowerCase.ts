import { Injectable } from '@angular/core';

@Injectable()
export class ConvertKeysHelper {

    keysToLowerCase(obj: object[]): object[] {
        if (obj instanceof Array) {
            for (let i = 0; i < obj.length; i++) {
                obj[i] = this.auxKeysToLowerCase(obj[i]);
            }
        }
        return obj;
    }

    private auxKeysToLowerCase(obj: object): object {

        let ret = {};
        let keys = Object.keys(Object(obj));

        for (let i = 0; i < keys.length; i++) {
            ret[keys[i].toLowerCase()] = obj[keys[i]];
        }
        return ret;
    }
}
