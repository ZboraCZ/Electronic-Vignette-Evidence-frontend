import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { Grid, Typography } from '@material-ui/core';
import { fetchLicencePlates } from 'api/vignettes';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { getVignettes } from 'store/user';
import Vignette from 'components/vignette';
import Alert from 'components/shared/alert';
import Loader from 'components/shared/loader';
import Modal from 'components/modal';
import { getUserId } from 'store/auth';
import { fetchVignetteTypes } from 'api/vignette-types'

const Overview = () => {
  const dispatch = useDispatch()
  const vignettesState = useSelector(getVignettes)
  const userId = useSelector(getUserId)
  
  const [emptyVignettes, setEmptyVignettes] = useState(false);
  const [modalState, setModalState] = useState(null)
  const [message, setMessage] = useState(null);

  
  useEffect(() => {
    dispatch(fetchLicencePlates(userId)).then(({ payload }) => {
        !!payload?.response?.data?.detail && setEmptyVignettes(true);
    })

    dispatch(fetchVignetteTypes())

  }, [dispatch])

  const openModal = (action, vignette) => {

    setModalState({
        action, 
        vignette
    })
  }

  const handleReloadState = () => {
    dispatch(fetchLicencePlates(userId)).then(({ payload }) => {
        //!!payload?.response?.data?.detail && setEmptyVignettes(true);

        //dispatch(fetchVignetteTypes())
    })
    
    
    setModalState(null)
  }

  const handleCloseMessage = () => {
    setMessage(null);
  }

  const { vignettes, types, pending, error } = vignettesState;

    if (pending)
        return <Loader />

    /*
    else if (error)
        return <Alert error={error} />
    */
    else if (emptyVignettes)
        return <Typography variant='h5' align='center'>Nemáte zakoupené žádné známky</Typography> 

    return (
        <div>
            <Grid container spacing={1}>
                {vignettes.map((v, i) => (
                    <Vignette 
                        key={i}
                        handleMenuAction={openModal} 
                        licensePlate={v.license_plate} 
                        types={types} 
                    />
                ))}
            </Grid>
            <Modal 
                state={modalState} 
                onReloadState={handleReloadState} 
                setMessage={msg => setMessage(msg)}
            />
            <Snackbar open={!!message} autoHideDuration={6000} onClose={handleCloseMessage}>
                <MuiAlert 
                elevation={6} 
                variant="filled" 
                onClose={handleCloseMessage} severity={message?.state === 'success' ? 'success' : 'error'}
                >
                {message?.desc}
                </MuiAlert>
            </Snackbar>
        </div>
    )
}

export default Overview;
