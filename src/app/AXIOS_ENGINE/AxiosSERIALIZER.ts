
class Serializer {

  static serialize(selector: string, selectorType?: number): { [key: string]: string | number } {
    
    const formData: { [key: string]: string | number } = {};
    const elemArr: Element[] = this.getElements(selector, selectorType);
    let result : { [key: string]: string | number } = {};
    
    //preparo il Json risultante
    elemArr.forEach((element) => {
      const name = element.getAttribute('name');
      const value = (element as HTMLInputElement).value;
      const numericValue = parseFloat(value);
      //aggiungo la classe selected solo per debug visivo
      element.classList.add('selected');

      if (name) {
        formData[name] =  isNaN(numericValue) ? value : numericValue;
      };

    });
      
    if (Object.keys(formData).length > 0){
      if(this.isJSON(formData)){
        result = formData;
       console.log('Serializzazione effettuata: ', result)
      }
      return result
    }else{
      throw console.error('ERRORE DI SERIALIZZAZIONE: accettarsi di aver inserito un selettore CSS o un elemento valido nella funzione di serializzazione accoppiato con il giusto tipo di selezione (0: elemento padre es: form o div che contiene elementi figli / 1: elementi singoli o gruppo di elementi singoli ) ');
    };
  };

  //funzione che ricerca elementi in base alla stringa passata alla funzione serialize e restituisce array di elementi del DOM corrispondente
  private static getElements(selector: string, selectorType?: number): Element[]{
    
    let result : Element[] = [];
    
    switch(selectorType){
      //caso di raggruppamento per selettori CSS
      case 0: 
          const selection = document.querySelectorAll(selector); 
          console.log(`selettore:  ${selector}`,selection);
          result = this.groupElementsByCssSelector(selection)
        break;

        //altri casi es raggruppamento per attributo name o altro.
        case 1:
          
        break;

      };

    return result;
  }

  private static findInputElements(node:Element): Element[]{
      const inputs: Element[] = [];
     
      // Se l'elemento corrente ha l'attributo 'data-validation' impostato su 'true', lo aggiungiamo all'array
      if (node instanceof Element && node.hasAttribute('name') && node.getAttribute('name') !== '' ) {
        inputs.push(node);
      }
  
      // Per ogni figlio dell'elemento corrente, chiamiamo ricorsivamente la funzione findInputElements
      for (const child of Array.from(node.children)) {
        inputs.push(...this.findInputElements(child as Element));
      }
      
      return inputs;
    }
  
  
    // funzione per raggruppamento per elementi elementi contenuti in container / div / form
    private static groupElementsByCssSelector(selection: NodeListOf<Element>): Element[] {
      //array che contiene tutti gli elementi figli della selection
      
      const allInputs: Element[] = [];
  
      // Per ogni elemento nella selezione, cercare tutti gli input nidificati
      selection.forEach((node) => {
        allInputs.push(...this.findInputElements(node));
      });
  
      return allInputs;
    
    }

  private static isJSON(entryJSON : Object): boolean {
    const jsonString = JSON.stringify(entryJSON)
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  }
  
}

export default Serializer;
