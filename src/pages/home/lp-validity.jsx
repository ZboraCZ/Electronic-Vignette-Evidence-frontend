import { useState, useEffect } from 'react';
import { Paper, Typography, TextField, Grid } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import LoadingButton from 'components/shared/loading-button';
import { makeStyles } from '@material-ui/core/styles';
import { fetchVignetteValidate } from 'api/vignettes'
import Vignette from 'components/vignette';

const LPValidity = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [LP, setLP] = useState('');

  const [validVignette, setValidVignette] = useState(null)
  
  const handleLP = ({ target }) => setLP(target.value)

  const handleButtonClick = () => {
   
    setLoading(true);
    setTimeout(() => {
      fetchVignetteValidate(LP).then(res => {
        setValidVignette(res)
        setLoading(false);
      });
    }, 1500);
    
  };

  useEffect(() => {
    //console.log()
  }, [validVignette])

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" className={classes.title}>
        Ověření platnosti
      </Typography>

      <Typography variant="subtitle1" className={classes.infoText}>
        Stačí zadat SPZ vozidla a dozvíte, zda máte pro dnešní den platnou elektronickou dálniční známku
      </Typography>

      <TextField
        type='text'
        variant='outlined'
        placeholder={'Např. 4A2 3000'}
        className={classes.infoText}
        label='SPZ'
        onChange={handleLP}
        value={LP}
        error={validVignette && !validVignette.valid}
      />

      <Grid container justify="center" >
        <LoadingButton 
          variant="contained" 
          size="medium" 
          color="primary" 
          className={classes.btn}
          onClick={handleButtonClick}
          disabled={loading}
          loading={loading}
        >
          Ověřit
        </LoadingButton>
      </Grid>
      
      {!!validVignette && (
        <div className={classes.vignetteValidated}>
          {validVignette.valid ? (
            <Vignette vignette={validVignette.vignette} /> 
          ) : (
            <Alert severity="error"><strong>Známka neplatná</strong></Alert>
          )}
        </div>
      )}
    </Paper>
  );
};
export default LPValidity;

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  title: {
    textAlign: 'center'
  },
  infoText: {
    textAlign: 'justify',
    margin: '15px 0'
  },
  input: {
    width: '100%'
  },
  btn: {
    width: '100px'
  },
  vignetteValidated: {
    marginTop: '15px'
  }
}))


