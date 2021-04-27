import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { Grid } from '@material-ui/core';
import { fetchUserVignettes } from 'api/user';
import { getVignettes } from 'store/user';

import Vignette from 'components/vignette';
import Alert from 'components/shared/alert';
import Loader from 'components/shared/loader';
import Modal from 'components/modal';
import { getUserId } from 'store/auth';

const Overview = () => {
  const dispatch = useDispatch()
  const vignettesState = useSelector(getVignettes)
  const userId = useSelector(getUserId)

  const [modalState, setModalState] = useState(null)
  
  useEffect(() => {
    dispatch(fetchUserVignettes(userId))
  }, [dispatch])

  const openModal = (action, vignetteId) => {
    setModalState({
        action, 
        vignette: vignettesMocked.find(vignette => vignette.id === vignetteId)
    })
  }
  //const { vignettes, pending, error } = vignettesState;
  const pending = false;
  const error = false;
    //mocked vignette
    const vignettesMocked = [{
        id: 1,
        licensePlate: '4A2 3000',
        serialNumber: 'XXX',
        vignetteType: {
            id: 1,
            name: '10denni',
            display_name: '10ti denní',
            price: 310,
            duration: '10 00:00:00'
        },
        userId: 0,
        validFrom: '2021-03-27'
    }]
    
    if (pending)
        return <Loader />

    else if (error)
        return <Alert error={error} />

    return (
        <div>
            <Grid container spacing={1}>
                {vignettesMocked.map((v, i) => (
                    <Grid item xs={6} sm={6} key={i}>
                        <Vignette handleMenuAction={openModal} vignette={v} />
                    </Grid>
                ))}
            </Grid>
            <Modal state={modalState} />
        </div>
    )
}

export default Overview;
