import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'siNoCambiar'
})
export class SiNoCambiarPipe implements PipeTransform {
  transform(value: number): string {
    if (value === 0) {
      return '-';
    } else if (value === 1) {
      return 'Si';
    } else if(value === 2) {
      return 'No';
    }else{
      return ''
    }
  }
}
