import './DashboardPage.scss'
import { useState , useEffect} from 'react';
import { TextField, Button } from '@mui/material';
import { TableFilter } from '../../../components/TableFilter/TableFilter'; 
import { AxiosHTTP } from '../../../app/AXIOS_ENGINE/AxiosHTTP';
import AxiosUtils from '../../../app/AXIOS_ENGINE/AxiosUTILS';


export const DashboardPage = () => {
  const [data, setData] = useState([])
  const [newData, setNewData] = useState<UserData[]>([]);
  //variabili per tabledata
  
  //variabili per form
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');

  interface UserData {
    id: number;
    name: string;
    surname: string;
    age: number;
    gender: string;
  };

  useEffect(()=>{
     setNewData(data);
  },[data])
 



  const params = {
    name: name,
    surname:surname,
  };

  //funzione per Chiamata POST con body request e risposta codificate in base64
  const getEncodedData = async (params: Object) => {
    try {
      const dataArr =  await AxiosHTTP({url:'/api/Test', body:params});
      
      //passa array a datatable per poi applicare i filtri 
      if('data' in dataArr){
        setData(dataArr.data)
      }

    } catch (err: any) {

      if (!err?.response) {
        AxiosUtils.Logger.log('nessuna risposta dal server');
      } else if (err.response?.status === 401) {
        AxiosUtils.Logger.log('non autorizzato');
      } else {
        AxiosUtils.Logger.log('errore riprovare');
      };
    };
  };

  //funzione per chiamata GET senza Body
  const handleCall = async () => {

    try {
      const result = await AxiosHTTP({url:'api/Test',method:'GET',encode:false});
      AxiosUtils.Logger.log(result)
    } catch (err: any) {
      AxiosUtils.Logger.log(err)
      if (!err?.response) {
        AxiosUtils.Logger.log('nessuna risposta dal server');
      } else if (err.response?.status === 401) {
        AxiosUtils.Logger.log('non autorizzato');
      } else {
        AxiosUtils.Logger.log('richiesta fallita');
      };
    };
  };
  return (
    <main>
      <div className="wrapper">
        <section className='mc'>
          <h2>chiamata senza body request</h2>
          <Button onClick={handleCall} sx={{marginTop:'20px'}} variant="contained">richiesta al server</Button>
          <div className="form">

            <h2>chiamata con Body request Codificato</h2>
            <TextField
              label="nome"
              placeholder='pippo'
              type='text'
              onChange={(event) => setName(String(event.target.value))}
            />
            <TextField
              label="cognome"
              placeholder='pluto'
              type='text'
              onChange={(event) => setSurname(String(event.target.value))}
            />
            <Button onClick={() => getEncodedData(params)} sx={{display:'block', margin:'0 auto', marginTop:'20px'}} variant="contained">invia form</Button>
            
          </div>
          <h2>datatable generata dopo aver decifrato i dati</h2>
          <TableFilter data={newData}/>
        </section>
        
      </div>
    </main>
  )
}
