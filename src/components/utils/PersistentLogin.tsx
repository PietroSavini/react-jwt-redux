import { Outlet } from "react-router-dom";
import {useState, useEffect} from 'react';
import { usePersistLoginMutation } from "../../app/api/PersistLoginApiSlice";
import { useAppDispatch} from "../../app/hooks";
import { useSelector } from 'react-redux'
import { selectToken, setCredentials } from "../../auth/authSlice";

export const PersistentLogin = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [persistLogin] = usePersistLoginMutation();
    const token = useSelector(selectToken)
    const isAuth = ( token !== null);
    useEffect(()=>{
        const verifyRefreshToken = async () => {
           try{
            const result = await persistLogin({}).unwrap()
            const accessToken = result.accessToken;
            const username = result.user;

            dispatch(setCredentials({user:username, accessToken:accessToken}))
           }catch(err){
            console.log(err)
           }finally{
            setIsLoading(false)
           }
        }
        !isAuth ? verifyRefreshToken() : setIsLoading(false);
    },[])

  
  return (
    <>
        {
            isLoading 
                ? <p>caricamento...</p>
                : <Outlet />
        }
    </>
  )
}
