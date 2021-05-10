import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import { vignetteTypes } from 'store/vignettes';
import ModalExtend from './modal-extend'
import ModalDelay from './modal-delay'
import ModalRemove from './modal-remove'
import { 
  postVignetteExtend,
  postVignetteDelay,
  deleteVignette
} from 'api/vignettes';

const Modal = ({ state, onReloadState, setMessage }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const typesState = useSelector(vignetteTypes);

  const [open, setOpen] = useState(false);
  const [extended, setExtended] = useState(null);
  const [delayed, setDelayed] = useState(new Date());
  const [removed, setRemoved] = useState(null);

  useEffect(() => {
    !!state && setOpen(true);
  }, [state])

  const handleClose = () => setOpen(false);

  const handleExtend = () => {

    dispatch(postVignetteExtend({ 
      id: extended.id,
      vignette_type_id: extended.vignetteType.id
    })).then(res => {
      if (res.error?.message === "Rejected") {
        setMessage({ 
          state: 'error', 
          desc: 'Vyskytla se chyba. Známku nelze prodloužit.'
        })
      } else {
        setMessage({ 
          state: 'success', 
          desc: 'Známka prodloužena.'
        })
        onReloadState()
      }
      //handleClose()
    })
    
  }

  const handleDelay = () => {

    dispatch(postVignetteDelay({
      id: state.vignette.id,
      delay_date: delayed
    })).then(res => {
      if (res.error?.message === "Rejected") {
        setMessage({ 
          state: 'error',
          desc: 'Známka nelze odložit. Platnost známky již začala.' 
        })
      } else {
        setMessage({ 
          state: 'success',
          desc: 'Známka odložena.' 
        })
        onReloadState()
      }
      //handleClose()
    })
  }

  const handleRemove = () => {
    //console.log(state.vignette.id)
    dispatch(deleteVignette(state.vignette.id)).then(res => {
      setMessage({ state: 'success', desc: 'Známka smazána.' })
      onReloadState()
      //handleClose()
    })
    

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
