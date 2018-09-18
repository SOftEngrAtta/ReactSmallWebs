import {
    Pipe ,
    PipeTransform
} from '@angular/core'

@Pipe({
    name : 'aucsplitimage'
})

export class AucSplitImage{
    transform(value : any ){
        if(value){
            let imageArray = (value && value.length)?value.split("#"): [value];
            
            var singleImage  = (imageArray && imageArray.length )?imageArray[0].split('/'):'';
            if(singleImage && singleImage.length){
                if( singleImage[2] == '88.99.218.95'){
                    singleImage[2] = "img.autorod.com";            
                }
            }
            let final_img = (singleImage) ? singleImage.join("/") : '/assets/images/car-imge.png';
            return final_img+'&h=50';
        } 
    }
}