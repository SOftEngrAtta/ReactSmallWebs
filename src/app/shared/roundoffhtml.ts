import {
    Pipe ,
    PipeTransform
} from '@angular/core'

@Pipe({
    name : 'roundoffhtmlnumber'
})

export class RoundOffHtmlNumber{
    transform(value : any ){
        return Math.round(value);    
    }
}