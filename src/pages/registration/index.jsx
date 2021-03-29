import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import LoadingButton from 'components/shared/loading-button'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';

const Registration = () => {
  const classes = useStyles();
 
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
          />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth
            name="lastName"
            label="Přijmení"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth
            name="email"
            label="Email"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth
            name="phone"
            label="Telefon"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth
            name="password"
            label="Heslo"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth
            name="passwordConfirm"
            label="Heslo potvrzení"
            variant="outlined"
          />
        </Grid>
      </Grid>
      <div className={classes.rightButton}>
        <LoadingButton color="primary" variant="contained" className={classes.loadingButton}>
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