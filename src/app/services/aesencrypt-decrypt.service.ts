import { Injectable } from '@angular/core';
import * as CryptoJS  from 'crypto-js' ;

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AESEncryptDecryptService {

  secretKey = "";
  constructor() { 
   this.secretKey=environment.aeskey; 

  }

  
  encrypt(value : string) : string{
    
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
}
