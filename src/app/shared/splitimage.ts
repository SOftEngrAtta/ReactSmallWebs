import {
    Pipe ,
    PipeTransform
} from '@angular/core'

@Pipe({
    name : 'splitimage'
})

export class SplitImage{
    transform(value : any ){
        if(value){
            let imageArray = (value && value.length)?value.split("#"): [value];
            
            var singleImage  = (imageArray && imageArray.length )?imageArray[0].split('/'):'';
            if(singleImage && singleImage.length){
                if( singleImage[2] == '88.99.218.95'){
                    singleImage[2] = "img.autorod.com";            
                }
            }
            return (singleImage) ? singleImage.join("/") : '/assets/images/car-imge.png';
        } 
    }
}