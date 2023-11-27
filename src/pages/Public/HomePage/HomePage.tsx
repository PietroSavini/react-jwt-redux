import { Link, Outlet } from 'react-router-dom';
export const HomePage = () => {
  return (
    <div className='APP'>
        <header>
            <div className="wrapper">
                <div className="header-content">
                    <div className="logo">
                        <Link to='/'>Logo</Link>
                    </div>
                    <nav>
                        <ul>
                            <li>link1</li>
                            <li>link2</li>
                            <Link to='/login'>Accedi</Link>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
        {/* Nell' Outlet vanno renderizzati i vari componenti o le altre page come la login Page */}
        <Outlet/>
        <footer>
            <div className="wrapper">
                <p>Footer element</p>
            </div>
        </footer>
    </div>
  )
}
