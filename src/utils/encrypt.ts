import * as CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse("1234567890mnbvcx");
const iv = CryptoJS.enc.Utf8.parse('zxcvbnmasdfghjkl');

const cipherOption = { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }

function encrypt(word: string): string  {
    const src = CryptoJS.enc.Utf8.parse(word);
    const encrypted = CryptoJS.AES.encrypt(src, key, cipherOption);
    return encrypted.ciphertext.toString().toUpperCase();
}
function decrypt(word: string): string {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypted = CryptoJS.AES.decrypt(srcs, key, cipherOption);

    const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);

    return decryptedStr.toString();
}


export { encrypt, decrypt };