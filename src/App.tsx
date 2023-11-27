//dipendenze Router
import { Routes, Route } from 'react-router-dom'
//Tutte le page che servono per il Router
import { LoginPage } from './pages/Public/Login/LoginPage'
import { HomePage } from './pages/Public/HomePage/HomePage';
import {NotFound} from './pages/404Page/NotFound'
import { DashboardPage } from './pages/Auth/DashBoard/DashboardPage';
import { MainPage } from './pages/Public/HomePage/MainPage';
import  RequireAuth  from './pages/Auth/RequireAuth'
import { PersistentLogin } from './components/PersistentLogin';



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}>
            {/* Public Routes */}
            {/* prima page visualizzata all'avvio */}
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
