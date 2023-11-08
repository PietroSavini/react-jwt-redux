import {createBrowserRouter} from 'react-router-dom'

//pages
import HomePage from './pages/HomePage/HomePage'
export const router = createBrowserRouter([
    {
        path:"/",
        element: <HomePage/>,
       
    },

])