import {
    Pipe ,
    PipeTransform
} from '@angular/core'

declare var moment: any;

@Pipe({
    name : 'reverse'
})



export class ReverseArray{
    transform(value : any ){
        let currentyear =  moment().format('YYYY')
        if(value && value.length && value[0]['Title'] != currentyear){
            return value.reverse();
        }
    }
}