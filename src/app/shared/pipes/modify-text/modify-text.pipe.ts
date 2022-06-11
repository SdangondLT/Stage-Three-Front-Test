import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modifyText'
})
export class ModifyTextPipe implements PipeTransform {

  transform(value: string, ...args: string[]): unknown {
//value es lo que esta antes del pipe | en el html
//'buscar' | modifyText:
    return `${value} ${args[0]}`;// recordar que los argumentos vienen en array
    //return `${value} ${args}`;//me falto decirle la posicion cero
  }

}
