import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import LoadingButton from 'components/shared/loading-button'
import { postLogin } from 'api/auth'; 

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const [creds, setCreds] = useState({
    email: '',
    password: ''
  })
  
  const handleCreds = ({ target }) => 
    setCreds(prevState => ({
      ...prevState,
      [target.name]: target.value
  }))
  
  const handleLogin = () => dispatch(postLogin(creds))
  

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Přihlášení
        </Typography>

        <TextField
          name='email'
          onChange={handleCreds}
          value={creds.email}
          label="Email"
          variant="outlined"
        />

        <TextField
          name='password'
          value={creds.password}
          onChange={handleCreds}
          label="Heslo"
          type='password'
          variant="outlined"
        />
        
        <LoadingButton 
          onClick={handleLogin}
          color="primary" 
          variant="contained"
        >
          Přihlásit se
          
        </LoadingButton>
        <div>
          <Typography className={classes.description}>
            Nemate vytvořený učet? 
            <Button 
              color='primary' 
              component={Link} 
              to='/registrace'
              data-cy='link-to-registration'
            >
              Zaregistrujte se.
            </Button>
          </Typography>
        </div>
      </Paper>
    </div>
  )
}

export default Login;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    width: '300px',
    height: '400px',
    padding: '30px',
    display: 'flex',
    flexDirection: "column",
    justifyContent: "space-between",
  },
  description: {
    textAlign: 'center',
  },
}));