/*
Questo è l' Engine delle chiamate a tutti gli EndPoint del WebService,  nel file creiamo un sistema che ci permette di incollare 
l'accessToken negli headers di ogni chiamata creando una baseQuery personalizzata, una funzione wrapper di baseQuery che controlla lo stato
dell'accessToken ed esegue il refresh nel caso in cui esso è scaduto. e gestisce la logica da apportare alle chiamate per quanto riguarda l'encoding in Base64
tutto questo in autonomia. definiamo poi il tipo di chiamata ed a quale endPoint con le builderMutations contenute negli altri file 
*/
import { fetchBaseQuery, createApi }  from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../auth/authSlice';
import { RootState } from '../store/store';
import { Encode } from '../../components/utils/functions/EncodeBodyRequest';
import { Decode } from '../../components/utils/functions/DecodeBodyRequest';

// preparazione query di base personalizzata: 
//le chiamate HTTPS verranno fatte con headers personalizzati che contengono l'AccessToken
const baseQuery = fetchBaseQuery({
    //url base della query, da cambiare in produzione
    baseUrl: 'https://localhost:7029',
    credentials: 'include',
    //creazione di headers personalizzati con metodo prepareHeaders()
    prepareHeaders: ( headers,  { getState } ) => {
        //prendo l'access Token salvato nello state
        const state: RootState = getState() as RootState;
        const token = state.auth.token;
        //Salvo il token nell'header 'Authorizzation'
        if ( token ) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

interface RefreshData {
    accessToken: string;
};

//funzione per la chiamata all' endpoint di refresh.
async function refreshAccessToken(api: any, extraOptions: any) {
    const refreshResult = await baseQuery({
        url: '/api/Test/Refresh',
        method: 'POST',
    }, api, extraOptions);

    if (refreshResult?.data) {
        const user = api.getState().auth.user;
        const accessToken = (refreshResult.data as RefreshData).accessToken;
        api.dispatch(setCredentials({ user, accessToken }));
        console.log('Nuovo Access Token salvato con successo');
        return true;
    } else {
        console.error('Refresh Token Scaduto, eseguire nuovamente il LogIn')
        api.dispatch(logOut());
        return false;
    };
};

//funzione wrapper di baseQuery, esegue la chiamata codificando i body request in base64 UTF-8
// controlla se accessToken è scaduto, se si, esegue la chiamata per Refresh del token
/*
** params
    - args => argomenti della richiesta (POST / GET, credentials:'include', URL ...etc)
    - api => istanza di RTKQuery utilizzata per eseguire le azioni associate allo store e chiamare azioni
    - extraOptions => 
*/
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    
    let newArgs = args;

    switch (true) {
        case args.body !== undefined:
            newArgs = { ...args, body: Encode(args.body) };
            console.log('Chiamata con corpo codificato: ', newArgs);
            break;

        default:
            console.log('Chiamata senza corpo: ', newArgs);
            break;
    };

    let result  = await baseQuery(newArgs, api, extraOptions);
    let decodedResult = Decode(result);
    
    if (result?.error?.status === 401) {
        if (await refreshAccessToken(api, extraOptions)) {
            result = await baseQuery(newArgs, api, extraOptions);
            decodedResult = Decode(result)
        };
    };
    //debug-------------------------------------------------------------------------------------------------
    console.log('risposta decodificata: ', decodedResult);
    return decodedResult ;
};

//esporto la configurazione delle chiamate personalizzate, lasciando libero il parametro builder del metodo createApi in quanto da altri file definiremo il tipo di chiamate da effettuare con metodi e contenuto del body della chiamata stessa
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({}),
});
    
 