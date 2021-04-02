import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import LoadingButton from 'components/shared/loading-button'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'

const Login = () => {
  const classes = useStyles();
 
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Přihlášení
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
        />

        <TextField
          label="Heslo"
          variant="outlined"
        />

        <LoadingButton color="primary" variant="contained">
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