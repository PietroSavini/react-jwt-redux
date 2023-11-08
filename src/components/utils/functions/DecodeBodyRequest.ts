import { Base64 } from 'js-base64'

export const Decode =  (input: any) => {
    if(input.data === '' || typeof input.data !== 'string' ||!Base64.isValid(input.data)){
        return input
    }else{
        try {
            const decodedString = Base64.decode(input.data);
            const decodedObject = JSON.parse(decodedString);
            input.data = {...decodedObject}
            return input;
        } catch (error) {
            console.error("Errore nella decodifica:", error);
            return null; 
        }
    }
}