import './DashboardPage.scss'
import { useRequestMutation } from '../../../app/api/requestApiSlice';
import { useGetDataMutation } from '../../../app/api/getData';
import { useState , useEffect} from 'react';
import { TextField, Button } from '@mui/material';
import { TableFilter } from '../../../components/TableFilter/TableFilter'; 


export const DashboardPage = () => {
  const [message] = useRequestMutation();
  const [getData] = useGetDataMutation();
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
     console.log('dati che arrivano alTableFilterComponent: ',newData)
  },[data])
 


  const params = {
    name: name,
    surname:surname,
  };

  //funzione per Chiamata POST con body request e risposta codificate in base64
  const getEncodedData = async (params: Object) => {
    try {
      const dataArr =  await getData(params);
      //passa array a datatable per poi applicare i filtri 
      if('data' in dataArr){
        setData(dataArr.data)
      }

    } catch (err: any) {

      if (!err?.response) {
        console.log('nessuna risposta dal server');
      } else if (err.response?.status === 401) {
        console.log('non autorizzato');
      } else {
        console.log('errore riprovare');
      };
    };
  };

  //funzione per chiamata GET senza Body
  const handleCall = async () => {

    try {
      const result = await message({}).unwrap();
    } catch (err: any) {

      if (!err?.response) {
        console.log('nessuna risposta dal server');
      } else if (err.response?.status === 401) {
        console.log('non autorizzato');
      } else {
        console.log('richiesta fallita');
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
