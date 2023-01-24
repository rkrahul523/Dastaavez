import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'customdatepipe' })

export class CustomDateTimePipe extends
    DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        if(value){
            return super.transform(value, "medium");
        }
        return null;  
    }
}