import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { Grid } from '@material-ui/core';
import { fetchUserVignettes } from 'api/user';
import { getVignettes } from 'store/user';

import Vignette from 'components/vignette'
import Alert from 'components/shared/alert';
import Loader from 'components/shared/loader'

import Modal from 'components/modal'

const Overview = () => {
  const dispatch = useDispatch()
  const vignettesState = useSelector(getVignettes)
  
  useEffect(() => {
    dispatch(fetchUserVignettes())
  }, [dispatch])

  const { vignettes, pending, error } = vignettesState;

    //mocked vignette
    /*const vignettes = [{
        vignetteId: 0,
        licensePlate: '4A2 3000',
        serialNumber: 'XXX',
        vignetteType: {
            id: 1,
            name: '10denni',
            display_name: '10ti denní',
            price: 310,
            duration: '10 00:00:00'
        },
        usedId: 0,
        validFrom: '2021-03-27'
    }]*/
    
    if (pending)
        return <Loader />

    else if (error)
        return <Alert error={error} />

    return (
        <div>
            <Grid container spacing={1}>
                {vignettes.map(v => (
                    <Grid item xs={6} sm={4} key={v.vignetteID}>
                        <Vignette vignette={v} />
                    </Grid>
                ))}
            </Grid>
            {/*<Modal />*/}
        </div>
    )
}

export default Overview;
