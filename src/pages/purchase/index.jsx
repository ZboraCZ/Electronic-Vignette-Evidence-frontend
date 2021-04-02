import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import LoadingButton from 'components/shared/loading-button'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import { vignetteTypes } from 'store/vignettes';
import { fetchVignetteTypes } from 'api/vignette-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import csLocale from "date-fns/locale/cs";
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


const Purchase = () => {
  const classes = useStyles();
  const {id}=useParams();
  /*console.log(id);
  const dispatch = useDispatch();
  const state = useSelector(vignetteTypes);
  useEffect(() => {
      dispatch(fetchVignetteTypes())
  }, [dispatch]);
  const {types}=state;
  types.find()*/
  const vignetteType = {id:1,name:"10denni",display_name:"10ti denní",price:310,duration:"10 00:00:00"}
  const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));

  const [values, setValues] = useState({
    textmask: '',
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
    };

    const handleChange = (event) => {
        setValues({
          ...values,
          [event.target.name]: event.target.value,
        });
      };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
      <Typography variant="h5" gutterBottom>
        Objednávka {vignetteType.display_name} známky
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
            <FormControl>
            <InputLabel htmlFor="formatted-text-mask-input">SPZ</InputLabel>
            <Input
                value={values.textmask}
                onChange={handleChange}
                name="textmask"
                id="formatted-text-mask-input"
                inputComponent={TextMaskCustom}
            />
      </FormControl>
        </Grid>
        <Grid item xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={csLocale}>
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="dd.MM.yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <div className={classes.rightButton}>
        <LoadingButton color="primary" variant="contained" className={classes.loadingButton}>
          Zakoupit
        </LoadingButton>
      </div>
      </Paper>
    </div>
  )
}

export default Purchase;

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/[A-ZA-z0-9]/, /[A-ZA-z0-9]/, /[A-ZA-z0-9]/, ' ', /[A-ZA-z0-9]/, /[A-ZA-z0-9]/, /[A-ZA-z0-9]/, /[A-ZA-z0-9]/]}
        placeholder={'Např. 4AZ 3000'}
        //showMask
      />
    );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    width: '400px',
    height: '300px',
    padding: '30px',
    display: 'flex',
    flexDirection: "column",
    justifyContent: "space-between",
  },
  description: {
    textAlign: 'center',
  },
  rightButton: {
    textAlign: 'center',
  },
  loadingButton: {
    
    width: '150px',
  },
}));