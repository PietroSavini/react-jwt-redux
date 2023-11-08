interface ValidationResults {
    userErr: boolean;
    pswErr: boolean;
    userErrMsg: string;
    pswErrMsg: string;
  }
  
  export function validateForm(user: string, psw: string): ValidationResults {
    
    let userErr: boolean = false;
    let pswErr: boolean = false;
    let userErrMsg: string = '';
    let pswErrMsg: string = '';
  
    // Controlla che username e Password siano inseriti e non corrispondano a campi vuoti
    if (user === '') {
      userErr = true;
      userErrMsg = 'Inserisci uno username';
    } else if (user.includes(' ')) {
      userErr = true;
      userErrMsg = 'Inserisci uno username valido';
    }
    if (psw === '') {
      pswErr = true;
      pswErrMsg = 'Inserisci una password';
    } else if (psw.includes(' ')) {
      pswErr = true;
      pswErrMsg = 'Inserisci una password valida';
    }
  
    // Restituisci i risultati della validazione
    return {
      userErr,
      pswErr,
      userErrMsg,
      pswErrMsg,
    };
  }

  
  
  
  
  
  