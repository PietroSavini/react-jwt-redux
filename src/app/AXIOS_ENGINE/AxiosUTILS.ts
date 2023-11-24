//Libreria Utility 
import { Base64 } from 'js-base64';

class AxiosUtils {

    static Logger = class {

      private static active :boolean = true;
      static log = (string?: string | undefined, variable?:any | undefined) => {
          if(this.active){
            console.log(`${string}`,variable)
          }
      };
    };

    static Strings = class {

        static Decode(input: any) {
          if (input.data === '' || typeof input.data !== 'string' || !Base64.isValid(input.data)) {
            return input;
          } else {
            try {
              const decodedString = Base64.decode(input.data);
              const decodedObject = JSON.parse(decodedString);
              input.data = { ...decodedObject };
              return input;
            } catch (error) {
              console.error("Errore nella decodifica:", error);
              return null;
            };
          };
        };
      
        static Encode(param: any) {
          const bodyString = JSON.stringify(param);
          const newBodyBase64 = Base64.encode(bodyString);
          return newBodyBase64;
        };
    };

};

export default AxiosUtils;