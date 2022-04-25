import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroListado'
})
export class FiltroListadoPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg =='' || arg.length < 3) return value;
    const result =[];
    for (const libro of value){
      if (libro.titulo.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        result.push(libro)
      }
    }
    return result;
  }

}
