import Utility from './app/AXIOS_ENGINE/AxiosUTILS';
import { useEffect } from 'react';
//React Router e componenti
import { Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/Public/Login/LoginPage'
import { HomePage } from './pages/Public/HomePage/HomePage';
import { NotFound } from './pages/404Page/NotFound'
import { DashboardPage } from './pages/Auth/DashBoard/DashboardPage';
import { MainPage } from './pages/Public/HomePage/MainPage';
import { PersistentLogin } from './components/PersistentLogin';
import  RequireAuth  from './pages/Auth/RequireAuth'



function App() {
  useEffect(() => {
    //abilito / disabilito console.log()
    /*
      //per farlo funzionare si deve sviluppare EndPoint
      //faccio chiamata al server su endpoint che risponde in base alla decisione di loggare o non
      //se ritorna 0 non loggo se ritorna 1 loggo
      const result = AxiosHTTP('/api/Test/logger', method:'GET' ...etc)
      if (result.data === 1){
        Utility.Logger.enable()
        console.log('console log abilitato')
      }else {
        Utility.Logger.disable()
      }
    */
    
  }, [])
  
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}>
            {/* Public Routes */}

            <Route index element={<MainPage/>}/>
            <Route path='login' element={<LoginPage/>}/>

            {/*Protected Routes */}

            <Route element={<PersistentLogin/>}>
              <Route element={<RequireAuth/>}>
                <Route path='dashboard' element={<DashboardPage/>}/>
              </Route>
            </Route>

            {/* Catch All */}
            <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
