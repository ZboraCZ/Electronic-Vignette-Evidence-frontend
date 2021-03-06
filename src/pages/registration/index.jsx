import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

import LoadingButton from 'components/shared/loading-button'
import Loader from 'components/shared/loader';
import { onEnterEvent } from 'utils/event'
import { postRegistration } from 'api/auth'
import { getAuthError, isNewlyRegistered, login } from 'store/auth'
import { validateEmail, validateNoNumbers, validateOnlyNumbers } from 'utils/validation';

const Registration = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authError = useSelector(getAuthError);
  const newlyRegistered = useSelector(isNewlyRegistered);
  const authPending = useSelector(state => state.auth.pending)

  const [creds, setCreds] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: ''
  })

  const [errors, setErrors] = useState({})
  const [formValid, setFormValid] = useState(false);
  const [validationErrors, setValidationErrors] = useState(
    creds
  );

  useEffect(() => {
    setErrors(authError)
  }, [authError])

  useEffect(() => {
       
    const isFormFilled = Object.values(creds).every(cred => cred.length > 0);
    
    setFormValid(isFormFilled);
  
  }, [creds])

  const formLabels = {
    email: 'Email',
    first_name: 'Jméno',
    last_name: 'Příjmení',
    phone: 'Telefon',
    password: 'Heslo',
    passwordConfirm: 'Heslo potvrzení'
  }

  const formTypes = {
    password: 'password',
    passwordConfirm: 'password',
    email: 'email'
  }


  useState(() => {
    onEnterEvent(() => register())
  }, [])

  const handleCreds = ({ target }) => {
    setCreds(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const helperErrorText = (name) => {
    return errors[name];

    
  }

  const register = () => {
    const { password, passwordConfirm } = creds;

    password !== passwordConfirm && setErrors(errors => ({
      ...errors,
      password: ['Hesla se neshodují'],
      passwordConfirm: ['Hesla se neshodují']
    }))
  
    setErrors(errors => ({
      ...errors,
      first_name: !validateNoNumbers(creds.first_name) ? 'Nesprávný formát jména' : '',
      last_name: !validateNoNumbers(creds.last_name) ? 'Nesprávný formát příjmení' : '',
      email: !validateEmail(creds.email) ? 'Nesprávný formát emailu' : '',
      phone: !validateOnlyNumbers(creds.phone) ? 'Nesprávný formát telefonního čísla' : ''
    }))

    const isFormValid = 
      password === passwordConfirm && 
      validateEmail(creds.email) &&
      validateNoNumbers(creds.first_name) &&
      validateNoNumbers(creds.last_name) &&
      validateOnlyNumbers(creds.phone);

    
    isFormValid && dispatch(postRegistration(creds));
  }

  const toAdministration = () => dispatch(login())
  
  if (authPending)
    return <Loader />


  if (newlyRegistered) 
    return (
      <div className={classes.root}>
        <div className={classes.newlyRegistered}>
          <Alert 
            action={
              <Button 
                onClick={toAdministration}
                variant='contained'
                className={classes.successButton}
              >
                Přejít do administrace
              </Button>
            }
          >
            <Typography variant="subtitle1" gutterBottom>
              Úspěšná registrace
            </Typography>
          </Alert>
        </div>
      </div>
    )
 
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
      <Typography variant="h5" gutterBottom>
        Registrace
      </Typography>
      <Grid container spacing={1}>
        {Object.keys(creds).map((cred, i) => (
          <Grid item xs={6} key={i}>
            <TextField 
              name={cred}
              label={formLabels[cred]}
              value={creds[cred]}
              onChange={handleCreds}
              error={!!errors[cred]}
              helperText={helperErrorText(cred)}
              type={!!formTypes[cred] ? formTypes[cred] : 'text'}
              variant='outlined'
              fullWidth
              required 
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.rightButton}>
        <LoadingButton 
          color="primary" 
          variant="contained" 
          className={classes.loadingButton}
          onClick={register}
          disabled={!formValid}
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
  newlyRegistered: {
    width: '600px',
    height: '200px',
    padding: '30px',
  },
  successButton: {
    background: theme.palette.success.main
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