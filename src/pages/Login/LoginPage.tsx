import { Box, Chip, Paper, TextField,Button } from '@mui/material';
import './LoginPage.scss'
import FaceIcon from '@mui/icons-material/Face';
import { useState } from 'react';

import { validateForm } from '../../components/utils/functions/LoginFormValidation';
import { setCredentials } from '../../auth/authSlice';
import { useLoginMutation } from '../../app/api/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';

// questo import riguarda la funzione login con la chiamata axios base va tolta una volta implementato il tutto con redux e RTKQuery


export const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [login] = useLoginMutation();

  //variabili di stato per settare i campi di input
  const [user, setUser] = useState<string>('');
  const [psw, setPsw] = useState<string>('');

  //variabili di errore per form validation
  const [userErr, setUserErr] = useState<boolean>(false);
  const [pswErr, setPswErr] = useState<boolean>(false);
  const [userErrMsg, setUserErrMsg] = useState<string>('');
  const [pswErrMsg, setPswErrMsg] = useState<string>('');

  // stringa di errore generale
  const [genErr , setGenErr] = useState<string>('');

  //funzione che gestisce il submit del login
  const validateLoginInfo = async (e: any) => {
    e.preventDefault()
    //reset
    //implementa fun
    setPswErr(false)
    setUserErr(false)
    setGenErr('')

    //Validation del Form
    const {
      userErr: newUserErr,
      pswErr: newPswErr,
      userErrMsg: newUserErrMsg,
      pswErrMsg: newPswErrMsg,
    } = validateForm(user, psw);

    //imposto i valori per restituire i messaggi di errore
    setUserErr(newUserErr);
    setPswErr(newPswErr);
    setUserErrMsg(newUserErrMsg);
    setPswErrMsg(newPswErrMsg);

    //condizione giusta per inviare il form
    if(user && !userErr && psw && !pswErr){
      console.log('Username e Password inseriti, mando il form')
      const credentials = {
        username: user,
        password: psw,
      } 
      handleLogin(credentials)
    }
  }
  //handleLogin fn
  interface Params {
    username: string;
    password: string;
  }



  //funzione che gestisce il login e salva i dati dello user ed il token nello state dell app
  //=> parmas:   { username, password }
  const handleLogin = async (params: Params) => {
    
    try{
      //login() mutazione del builder 
      const result = await login(params);
      console.log('result del login', result)
      if('data' in result){
        const accessToken = result.data.accessToken;
        dispatch(setCredentials({accessToken, user}));
        console.log('user ed accessToken salvati nello state')
        //reset degli input
        setUser('')
        setPsw('')
        //reinderizzo alla pagina dashboard
        navigate('/dashboard')
      };
      
    }catch(err:any){
      //non mi serve la gestione di 400 in quanto cè la validazione front end dove non parte il form se i campi sono vuoti
      //ne di 401 (token expired) in quanto la casistica è gestita nel wrapper della  baseQuery in api/apiSlice.ts
      if(!err?.originalStatus){
        setGenErr('nessuna risposta dal server')
        //il webService è impostato per rispondere con una risposta 500 invece di 401 (da gestire nel backend) e nel messaggio scrive "utente non trovato"
      }else if( err.originalStatus === 403 ){
        setGenErr('non autorizzato')
      }else{
        setGenErr('logIn Fallito')
      }
    }
    
  }

  return (
    <>
      <main>
        <div className="wrapper">
            <Paper className='login-form-container' elevation={8} >
              <Chip sx={{   width:'150px',height:'60px'}}icon={<FaceIcon />} label="Log In" variant="outlined" />
              {/* Log in form */}
              <form noValidate onSubmit={validateLoginInfo} >

                <Box className='login-form-group'>
                  <div className="input-container">
                    <TextField 
                      onChange={(e) => setUser(e.target.value)} 
                      id="username" 
                      label="Username *" 
                      variant="standard" 
                      error={userErr}
                      value={user}
                    />
                    {userErr && <p className='error'>{userErrMsg}</p>}
                  </div>

                  <div className="input-container">
                    <TextField 
                      onChange={(e) => setPsw(e.target.value)} 
                      id="password" 
                      label="Password *" 
                      type="password" 
                      variant="standard" 
                      error={pswErr}
                      value={psw}
                    />
                    {pswErr && <p className='error'>{pswErrMsg}</p>}
                  </div>
                  
                  {genErr && <div className='gen-error'>{genErr}</div>}
                  <Button sx={{marginTop:'50px', width:'50%', alignSelf:'center'}} type='submit' variant="contained">Accedi</Button>
                </Box>
              </form>
              {/*  END log in form */}
            </Paper>
        </div>
      </main>
    </>
  )
}
