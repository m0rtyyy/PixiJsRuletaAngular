import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

const SECRET_KEY = 'encryptProyectoOnubense2@21';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  set(key: any, data: any): void {
    try {
      var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
      ////console.log(ciphertext);

      localStorage.setItem(key, ciphertext);
    } catch (e) {
      //console.error('Error saving', e);
    }
  }

  get(key: any): any {
    try {
      const item = localStorage.getItem(key);
      if (!item) {
        return null;
      }
      var bytes  = CryptoJS.AES.decrypt(item, SECRET_KEY);
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    } catch (e) {
      //console.error('Error getting data', e);
      return null;
    }
  }
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      //console.error('Error removing key', e);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (e) {
      //console.error('Error cleaning localstorage', e);
    }
  }
}