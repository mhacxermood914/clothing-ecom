import { Outlet, Link } from 'react-router-dom'
import { ReactComponent as CrownLogo } from './../../assets/crown.svg'
import './navigation.styles.scss'
const Navigation = ()=>{
    return (
      <>
        <div className='navigation'>
            <Link to="/" className='logo-container'>
                <div><CrownLogo className='logo' /></div>
            </Link>
            <div className='nav-links-container'>
                <Link to="/shop" className="nav-link">SHOP</Link>
            </div>
        </div>
        <Outlet />
      </>
    )
}

export default Navigation;