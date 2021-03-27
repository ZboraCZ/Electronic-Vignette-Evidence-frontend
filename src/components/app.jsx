import Navbar from 'components/navbar'
import Router from 'routes'
import Footer from 'components/footer'
import Wrapper from 'components/shared/wrapper'

import { makeStyles } from '@material-ui/core/styles'
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

import { getIsAuth, login, logout } from 'store/auth';

const App = () => {
  const classes = useStyles();

  const dispatch = useDispatch()
  const auth = useSelector(getIsAuth)

  const handleAuth = auth => {
    dispatch(auth ? login() : logout())
  }

  return (
    <div className={classes.app}>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={() => handleAuth(!auth)} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <Navbar />
      <main className={classes.main}>
        <Wrapper>
          <Router />
        </Wrapper>
      </main>
      <Footer />
    </div>
  )
}
export default App;

const useStyles = makeStyles(theme => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },
  main: {
    flexGrow: '1',
    marginTop: '80px',
    marginBottom: '30px',
    background: theme.background
  }
}));
