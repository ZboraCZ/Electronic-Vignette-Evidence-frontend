import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
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

const ModalExtend = ({ vignette, handleExtended }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const typesState = useSelector(vignetteTypes);
  
    const { types, pending } = typesState;
  
    const [selectedType, setSelectedType] = useState({});

    useEffect(() => {
      //dispatch(fetchVignetteTypes())
    }, [])

    //console.log(vignette)

    useEffect(() => {
      //console.log(vignette, selectedType);
      handleExtended({
        id: vignette.id, 
        vignetteType: selectedType
      })
      
    }, [selectedType])
  
    const handleSelectedType = ({ target }) => {
      setSelectedType(
        typesState.types.find(type => type.id === Number(target.value))
      )
    }
  
    if (pending)
      return <Loader />
  
    return (
      <>
        <DialogTitle>Prodloužit platnost známky</DialogTitle>
        <DialogContent>
          <DialogContentText>
              Zvolená SPZ: <strong>{vignette?.license_plate}</strong>
          </DialogContentText>
          <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel>Varianta</InputLabel>
              <Select
                value={selectedType.id || ''}
                onChange={handleSelectedType}
                label="Varianta"
                defaultValue={''}
              >
                {types.map(type => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.display_name}
                  </MenuItem>
                ))}
              </Select>
          </FormControl>    
  
          {!!Object.keys(selectedType).length && (
            <div>
              <Typography variant='button'>
                Cena: <span className={classes.price}>{selectedType.price} Kč</span>
              </Typography>
            </div>
          )} 
        </DialogContent>
      </>
    )
}

export default ModalExtend;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '300px',
  },
  price: {
    color: theme.custom.price
  }
}))
