import { Injectable } from '@angular/core';

declare var CryptoJS: any;
const secretKey: string = "secretKey!@#";

@Injectable()
export class StorageService {

  constructor() {
   }
  

  set(key: string, Obj: any){
    localStorage.setItem(key,JSON.stringify(Obj));
  }

  get(key: string){
    var item = localStorage.getItem(key);
    if(!item || item == null || item == "undefined" ){
      return
    }
    return JSON.parse(item)
  }

  setEncrypted(key: string, Obj: any){
    var encryptedObj = CryptoJS.AES.encrypt(JSON.stringify(Obj), secretKey).toString();
    localStorage.setItem(key,encryptedObj);
  }
  
  getDecrypted(key: string){
    var encryptedString = localStorage.getItem(key);
    if(encryptedString == null){
      return
    }
    var bytes  = CryptoJS.AES.decrypt(encryptedString, secretKey);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }

  remove(key: string){
    localStorage.removeItem(key);
  }

  clear(){
    localStorage.clear();
  }
}