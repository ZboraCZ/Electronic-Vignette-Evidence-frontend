import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { vignetteTypes } from 'store/vignettes';
import ModalExtend from './modal-extend'
import ModalDelay from './modal-delay'
import ModalRemove from './modal-remove'
import { 
  postVignetteExtend,
  postVignetteDelay,
  deleteVignette
} from 'api/vignettes';

const Modal = ({ state }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const typesState = useSelector(vignetteTypes);

  const [open, setOpen] = useState(false);
  const [extended, setExtended] = useState(null);
  const [delayed, setDelayed] = useState(null);
  const [removed, setRemoved] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    !!state && setOpen(true);
  }, [state])

  const handleClose = () => setOpen(false);

  const handleExtend = () => {
    console.log('state extend', state, extended)
    /*
    dispatch(postVignetteExtend({ 
      id: extended.id,
      vignette_type_id: extended.duration,
      days: extended.duration.split(' ')[0]
    })).then(res => {
      setMessage('Známka prodloužena')
    })
    */
    
    
    handleClose()
  }

  const handleDelay = () => {
    console.log(delayed)
    /*dispatch(postVignetteDelay()).then(res => {
      setMessage('Známka odložena')
    })
    */
  }

  const handleRemove = () => {
    /*
    dispatch(deleteVignette(state.vignette.id)).then(res => {
      setMessage('Známka smazána')
    })
    */
   //console.log(state.vignette.id)
  }

  const handleCloseMessage = () => {
    setMessage(null);
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        {state?.action === 'extend' && (
          <ModalExtend 
            vignette={state.vignette} 
            handleExtended={extended => setExtended(extended)}
          />
        )}

        {state?.action === 'delay' && (
          <ModalDelay 
            vignette={state.vignette} 
            handleDelayed={delayed => setDelayed(delayed)}
          />
        )}

        {state?.action === 'remove' && (
          <ModalRemove 
            vignette={state.vignette} 
          />
        )}

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Zrušit
          </Button>

          {state?.action === 'extend' && (
            <Button onClick={handleExtend} color="primary" autoFocus>
              Prodloužit platnost
            </Button>
          )}

          {state?.action === 'delay' && (
            <Button onClick={handleDelay} color="primary" autoFocus>
              Odložit platnost         
            </Button>
          )}

          {state?.action === 'remove' && (
            <Button onClick={handleRemove} color="primary" autoFocus>
              Potvrdit odstranění            
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Snackbar open={!!message} autoHideDuration={6000} onClose={handleCloseMessage}>
        <MuiAlert 
          elevation={6} 
          variant="filled" 
          onClose={handleCloseMessage} severity="success"
        >
          {message}
        </MuiAlert>
      </Snackbar>

    </div>
  );
}
export default Modal 

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '300px',
  },
  price: {
    color: theme.custom.price
  }
}))
