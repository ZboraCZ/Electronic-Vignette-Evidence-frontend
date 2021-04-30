import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { Grid, Typography } from '@material-ui/core';
import { fetchLicencePlates } from 'api/vignettes';
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
                    <Grid item xs={6} sm={6} key={i}>
                        <Vignette handleMenuAction={openModal} licensePlate={v.license_plate} types={types} />
                    </Grid>
                ))}
            </Grid>
            <Modal state={modalState} />
        </div>
    )
}

export default Overview;
