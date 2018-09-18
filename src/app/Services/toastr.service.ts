import { Injectable } from '@angular/core';

declare var toastr :any;

@Injectable()
export class ToastrService {

  constructor(){
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      // "showDuration": "300",
      // "hideDuration": "1000",
      "timeOut": "10000000000",
      "extendedTimeOut": "10000000000",
      // "showEasing": "swing",
      // "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
  }
  success(text:any){
    if(text == "Please wait..."){
      toastr.success(text)
    }else{
      toastr.success(text , { timeOut : 1000 , extendedTimeOut : 1000 })
    }
    
  }
  warning(text:any){
    toastr.warning(text)
  }
  error(text:any){
    toastr.error(text)
  }
  clear(){
    toastr.clear();
  }
}
