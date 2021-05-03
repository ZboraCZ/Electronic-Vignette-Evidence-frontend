import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { Grid } from '@material-ui/core';
import { fetchUserHistory } from 'api/user';
import { getUser } from 'store/user';

import HistoryVignette from 'components/history-vignette'
import Alert from 'components/shared/alert';
import Loader from 'components/shared/loader'

const History = () => {
    const dispatch = useDispatch()
    const historyState = useSelector(getUser)
  
    useEffect(() => {
        dispatch(fetchUserHistory())
    }, [dispatch])

    const { history, pending, error } = historyState;

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
                {history.map((v, i) => (
                    <Grid item xs={6} sm={6} key={i}>
                        <HistoryVignette vignette={v} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default History;
