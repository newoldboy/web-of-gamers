import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalizeAll' })
export class CapitalizeAllPipe implements PipeTransform {

    transform(name: string): string {
        let palavras = name.split(' ');
        let capitalize = '';
        for (let i = 0; i < palavras.length; i++) {
            const element = (palavras[i]).toLowerCase();
            capitalize += element.charAt(0).toUpperCase() + element.slice(1) + ' ';
        }
        return capitalize;
    }
}
