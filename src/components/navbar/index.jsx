import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar  } from "@material-ui/core";

import MobileBar from './mobile-bar'
import DesktopBar from './desktop-bar'

const Navbar = (props) => {

  const [isMobile, setMobile] = useState(false)

  const classes = useStyles()

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
    <AppBar className={classes.navbar}>   
      <Toolbar className={classes.toolbar}>       
        {isMobile ? <MobileBar /> : <DesktopBar />}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;

const useStyles = makeStyles(() => ({
  navbar: {
    paddingRight: "79px",
    paddingLeft: "79px",
    "@media (max-width: 700px)": {
      paddingLeft: 0,
      paddingRight: 0
    } 
  },
  toolbar: {
    display: 'flex',
    justifyContent: "space-between"
  }
}))