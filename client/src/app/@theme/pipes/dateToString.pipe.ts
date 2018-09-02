import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateToString' })
export class DateToStringPipe implements PipeTransform {

    transform(data: Date): string {
        if (data) {
            let date = new Date(data);
            return ('0' + date.getDate()).slice(-2) + '/' +
            ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
            date.getFullYear();
        } else {
            return '';
        }
    }
}
