import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoadingButton from 'components/shared/loading-button'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import { useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import { vignetteTypeById } from 'store/vignettes';
import { fetchVignetteTypes } from 'api/vignette-types';
import { useDispatch, useSelector } from 'react-redux';
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import csLocale from "date-fns/locale/cs";
import LicensePlateValidator from 'components/shared/license-plate-validator'
import Loader from 'components/shared/loader';
import { fetchVignetteValidate } from 'api/vignettes';
import Tooltip from '@material-ui/core/Tooltip';

import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';

const Purchase = () => {
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [validFrom, setValidFrom] = useState(null)
  
  const [vignetteFree, setVignetteFree] = useState(null);
  const [isFetching, setIsFetching] = useState(null);
  const [lp, setLP] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams(); 
  
  const vignetteType = useSelector(state => vignetteTypeById(state, Number(id)));

  useEffect(() => {
    dispatch(fetchVignetteTypes())
  }, [dispatch]);
  
  useEffect(() => {
    if(lp && lp.length === 0)
      setVignetteFree(null)

  }, [lp]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const validFormat = (lp) => {
    if (lp) {
      setIsFetching(true)
      setTimeout(() => {
        fetchVignetteValidate(lp)
        .then(response => {
          setIsFetching(false)
          setVignetteFree(false)     
        })
        .catch(err => {  
          setVignetteFree(true)
          setIsFetching(false)
        })
      }, 1500)
    
    } else {
      setVignetteFree(null)
    }
  }

  if (!vignetteType) 
    return <Loader />

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Objednávka <strong>{vignetteType.display_name}</strong> známky
        </Typography> 
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid 
              container 
              justify='center' 
              alignContent='center' 
              alignItems='center'
            >
              <Grid item xs={9}>
                <LicensePlateValidator 
                  onChange={lp => setLP(lp)}
                  validFormat={validFormat} 
                  pending={isFetching} 
                  state={vignetteFree} 
                />
            
              </Grid>

              <Grid item xs={3}>
                {isFetching ? (
                  <Loader />
                ) : (
                  <>
                    {vignetteFree === null && (
                      <Tooltip title="Ověřte platnost elektronické dálniční známky dle zadané SPZ" arrow>
                        <InfoIcon />
                      </Tooltip>
                    )}

                    {vignetteFree && (
                      <CheckIcon color='primary'/>
                    )} 

                    {vignetteFree === false && (
                      <ErrorIcon color='error'/>
                    )}
                  </>
                )}
                
              </Grid>     
            </Grid>

            <Typography variant='subtitle1'>
              {vignetteFree === false && (
                `Na SPZ je již zakoupená dálniční známka`
              )}
            </Typography>
                
            
          </Grid>
          <Grid item xs={12}>
              <div className={classes.section}>
                <Typography gutterBottom variant="body1">
                  Zvolte začátek platnosti 
                </Typography>
                <Chip 
                  onClick={() => setValidFrom('today')} 
                  color={validFrom === 'today' ? 'primary' : 'default'} 
                  label="Dnes" 
                  className={classes.chip}  
                />
                <Chip 
                  onClick={() => setValidFrom('tomorrow')}
                  color={validFrom === 'tomorrow' ? 'primary' : 'default'}
                  label="Zítra" 
                  className={classes.chip}
                />
                <Chip 
                  onClick={() => setValidFrom('date')} 
                  color={validFrom === 'date' ? 'primary' : 'default'} 
                  label="Zvolte datum" 
                  className={classes.chip} 
                />
              </div>
              {validFrom === 'date' && (
              <div className={classes.datePicker}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={csLocale}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Začátek platnosti"
                    format="dd.MM.yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    className={classes.spz}
                    inputVariant="outlined"
                  />
                </MuiPickersUtilsProvider>
              </div>
              )}
            </Grid>
        </Grid>
        <div>
          <Grid 
            container   
            alignItems="center"
          >
            <Grid item xs={6}>
              <Typography variant='button'>
                Cena: <span className={classes.price}>300 Kč</span>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <LoadingButton 
                color="primary" 
                variant="contained" 
                className={classes.loadingButton}
                disabled={!(validFrom && vignetteFree)}
              >
                Zakoupit
              </LoadingButton>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  )
}

export default Purchase;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    width: '400px',
    height: 'auto',
    padding: '30px',
    display: 'flex',
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: 'center'
  },
  loadingButton: {
    width: '150px',
  },
  spz: {
    width: '200px'
  },
  price: {
    color: theme.custom.price
  },
  chip: {
    margin: theme.spacing(0.5),
    cursor: 'pointer'
  },
  section: {
    marginTop: '15px',
    marginBottom: '15px'
  },
  datePicker: {
    marginBottom: '15px'
  }
}));

