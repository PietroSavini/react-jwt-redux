
import { Base64 } from 'js-base64'

export const Encode = (param:Object) =>{
    const bodyString = JSON.stringify(param) 
    const newBodyBase64 = Base64.encode(bodyString)
    // const utf8Encoder = new TextEncoder();
    // const utf8Bytes = utf8Encoder.encode(bodyString);
    // const newBodyBase64 = fromByteArray(utf8Bytes);
    return newBodyBase64
}