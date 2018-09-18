import {
    Pipe ,
    PipeTransform
} from '@angular/core'
declare var moment: any;
@Pipe({
    name : 'customtime'
})

export class CustomeTime{
    transform(value : any ){
        if(value){
            let time = moment(value).format('HH:mm');
            if(time == "00:00"){
                return '';
            }else{
                return '[ '+time+' ]'
            }
        }else return '';
    }
}