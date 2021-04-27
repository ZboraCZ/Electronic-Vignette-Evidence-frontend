import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography'
import { fetchVignetteTypes } from 'api/vignette-types';
import { vignetteTypes } from 'store/vignettes';
import Loader from 'components/shared/loader';
import DateFnsUtils from '@date-io/date-fns';
import csLocale from "date-fns/locale/cs";

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';


const ModalDelay = ({ vignette }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    //const typesState = useSelector(vignetteTypes);
  
    //const { types, pending } = typesState;
  
    //const [selectedType, setSelectedType] = useState({});
  
    /*useEffect(() => {
      dispatch(fetchVignetteTypes())
    }, [])
    */
    /*
    const handleSelectedType = ({ target }) => {
      setSelectedType(
        typesState.types.find(type => type.id === Number(target.value))
      )
    }
    */

    console.log(vignette)
  
    return (
      <>
        <DialogTitle>Odložit platnost známky</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Zvolená SPZ: <strong>{vignette?.licensePlate}</strong>
            </DialogContentText>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={csLocale}>
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Odložení platnosti"
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
        </DialogContent>
      </>
    )
}

export default ModalDelay;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '300px',
  },
  price: {
    color: theme.custom.price
  }
}))
