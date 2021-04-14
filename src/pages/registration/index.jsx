import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import LoadingButton from 'components/shared/loading-button'
import { onEnterEvent } from 'utils/event'
import { postRegistration } from 'api/auth'

const Registration = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [creds, setCreds] = useState({
    email: 'test@test.cz',
    first_name: 't1',
    last_name: 't2',
    phone: '123456789',
    password: 'test',
    passwordConfirm: 'test'
  })

  useState(() => {
    onEnterEvent(() => register())
  }, [])

  const handleCreds = ({ target }) => 
    setCreds(prevState => ({
      ...prevState,
      [target.name]: target.value
  }))

  const register = () => dispatch(postRegistration(creds))
 
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
      <Typography variant="h5" gutterBottom>
        Registrace
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField fullWidth
            name="firstName"
            label="Jméno"
            variant="outlined"
            value={creds.firstName}
            onChange={handleCreds}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth
            name="lastName"
            label="Přijmení"
            variant="outlined"
            value={creds.lastName}
            onChange={handleCreds}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth
            name="email"
            label="Email"
            variant="outlined"
            value={creds.email}
            onChange={handleCreds}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth
            name="phone"
            label="Telefon"
            variant="outlined"
            value={creds.phone}
            onChange={handleCreds}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth
            name="password"
            type='password'
            label="Heslo"
            variant="outlined"
            value={creds.password}
            onChange={handleCreds}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth
            name="passwordConfirm"
            type='password'
            label="Heslo potvrzení"
            variant="outlined"
            value={creds.passwordConfirm}
            onChange={handleCreds}
          />
        </Grid>
      </Grid>
      <div className={classes.rightButton}>
        <LoadingButton 
          color="primary" 
          variant="contained" 
          className={classes.loadingButton}
          onClick={register}
        >
          Registrovat se
        </LoadingButton>
      </div>
        <div>
          <Typography className={classes.description}>
            Máte již vytvořený účet? 
            <Button color="primary" component={Link} to='/login'>
              Přihlaste se.
            </Button>
          </Typography>
        </div>
      </Paper>
    </div>
  )
}

export default Registration;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    width: '600px',
    height: '400px',
    padding: '30px',
    display: 'flex',
    flexDirection: "column",
    justifyContent: "space-between",
  },
  description: {
    textAlign: 'center',
  },
  rightButton: {
    textAlign: 'right',
  },
  loadingButton: {
    
    width: '150px',
  },
}));