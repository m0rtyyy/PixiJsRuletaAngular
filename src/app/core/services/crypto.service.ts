import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

const SECRET_KEY = 'encryptCobos2@22-APP.';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }
  encriptar(data:any){
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();

    return ciphertext;   
  }

  desencriptar(data:any){
    var bytes  = CryptoJS.AES.decrypt(data, SECRET_KEY);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decryptedData;
  }
}
