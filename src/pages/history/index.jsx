import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { Grid } from '@material-ui/core';
import { fetchUserHistory } from 'api/user';
import { fetchVignetteTypes } from 'api/vignette-types';
import { getUserId } from 'store/auth';
import { getVignettes } from 'store/user';

import HistoryVignette from 'components/history-vignette'
import Alert from 'components/shared/alert';
import Loader from 'components/shared/loader'

const History = () => {
    const dispatch = useDispatch()
    const historyState = useSelector(getVignettes)
    const userId = useSelector(getUserId)
  
    useEffect(() => {
        dispatch(fetchUserHistory(userId));
        dispatch(fetchVignetteTypes());
    }, [dispatch])

    const { history, pending, error } = historyState;

    //mocked vignette
    // odkomentovat a dole misto history dat testHistory
    /*var testHistory = [{
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
        valid_from: '2021-03-27T00:00:00',
        created: '2021-03-27T00:00:00'
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
