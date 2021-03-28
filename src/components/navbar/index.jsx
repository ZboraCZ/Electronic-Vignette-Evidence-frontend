import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import Wrapper from 'components/shared/wrapper';
import { getIsAuth, login, logout } from 'store/auth';
import MobileBar from './mobile-bar'
import DesktopBar from './desktop-bar'

const Navbar = (props) => {

  const [isMobile, setMobile] = useState(false)

  const classes = useStyles()

  const dispatch = useDispatch()
  const auth = useSelector(getIsAuth)

  const handleAuth = auth => {
    dispatch(auth ? login() : logout())
  }

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 700
      ? setMobile(true)
      : setMobile(false)
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  return (
    <>
      <FormGroup className={classes.fakeAuth}>
        <FormControlLabel
          control={<Switch checked={auth} onChange={() => handleAuth(!auth)} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar className={classes.navbar}>   
        <Toolbar disableGutters className={classes.toolbar}>  
          <Wrapper className={classes.NavbarWrapper}>  
            {isMobile ? <MobileBar /> : <DesktopBar />}
          </Wrapper>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar;

const useStyles = makeStyles(() => ({
  navbar: {
    "@media (max-width: 700px)": {
      paddingLeft: 0,
      paddingRight: 0
    } 
  },
  toolbar: {
    display: 'flex',
    justifyContent: "space-between"
  },
  NavbarWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '1200px'
  },
  fakeAuth: {
    width: '100%',
    height: '40px',
    position: 'fixed',
    background: 'silver'
  }
}))