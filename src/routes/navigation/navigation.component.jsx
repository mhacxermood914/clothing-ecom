import { Outlet, Link } from 'react-router-dom'
import { signOutUser } from '../../utils/firebase/firebase'
import { useContext } from 'react'
import { UserContext } from '../../contexts/user.context'
import { ReactComponent as CrownLogo } from './../../assets/crown.svg'
import './navigation.styles.scss'
const Navigation = ()=>{
    console.log('rerender')
    const { currentUser, setCurrentUser} = useContext(UserContext)
    const signOutUserHandler = async ()=>{
      await signOutUser()
      setCurrentUser(null)
    }
    return (
      <>
        <div className='navigation'>
            <Link to="/" className='logo-container'>
                <div><CrownLogo className='logo' /></div>
            </Link>
            <div className='nav-links-container'>
                <Link to="/shop" className="nav-link">SHOP</Link>
                {
                  currentUser?
                  <span className="nav-link" onClick={signOutUserHandler}>SIGN OUT</span>
                  :<Link to="/auth" className="nav-link">SIGN IN</Link> 
                }
            </div>
        </div>
        <Outlet />
      </>
    )
}

export default Navigation;