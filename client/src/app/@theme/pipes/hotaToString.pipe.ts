import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'horaToString' })
export class HoraToStringPipe implements PipeTransform {

    transform(data: Date): string {
        if (data) {
            let date = new Date(data);
            return ( ((date.getHours() + '').length === 1) ? '0' + date.getHours() : date.getHours()) + ':' + date.getMinutes();
        } else {
            return '';
        }
    }
}
