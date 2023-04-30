import * as CryptoJS from 'crypto-js';

export default function calculaHash(){

    const ts = Date.now().toString();

    const pubKey = localStorage.getItem('pubkey');
    const privKey = localStorage.getItem('privkey');
    
    const hashString = ts + privKey + pubKey;

    const hash = CryptoJS.MD5(hashString).toString();

    return hash
};