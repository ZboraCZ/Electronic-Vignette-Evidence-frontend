import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid, Divider, Paper, Tabs, Tab } from '@material-ui/core'

import { getIsAdmin } from 'store/user';
import TabPanel from './tab-panel'
import VignetteTypesTable from './vignette-types-table'
import UserInfo from './user-info';

const MyProfile = (props) => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const matches = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const isAdmin = useSelector(getIsAdmin);

    const [tab, setTab] = useState(0);

    const tabs = [
        {label: 'informace', url: 'informace'},
        {label: 'historie známek' },
        {label: 'platební údaje' }
    ]

    const adminTabs = [
        {label: 'správa typů známek', url: 'typy-znamek'},
        {label: 'seznam uživatelů', url: 'uzivatele'}
    ]

    const mergedTabs = [
        ...tabs,
        ...adminTabs
    ]
  
    useEffect(() => {
        const { tab } = props.match.params;
        const index = mergedTabs.findIndex(_tab => _tab.url === tab)
        setTab(index)
    }, [])

    const handleTabChange = (event, val) => {
        setTab(val); 
        history.push(`/profil/${mergedTabs[val].url}`)
    }


  return (
    <Grid container spacing={2}>
        <Grid item xs={12} sm={4} >
            <Paper>
                <Tabs
                    orientation={matches ? 'horizontal' : 'vertical'}
                    value={tab}
                    onChange={handleTabChange}
                    className={classes.tabs}
                    scrollButtons="auto"
                    variant="scrollable"
                >
                    {tabs.map((tab, i) => (
                        <Tab key={i} label={tab.label} disabled={(i == 1 || i == 2) ? true : false} />
                    ))}

                    {isAdmin && adminTabs.map((tab, i) => (
                        <Tab key={i} label={tab.label} />
                    ))}

                </Tabs>
            </Paper>
        </Grid>
        
        <Grid item xs={12} sm={8}>                        
            <TabPanel value={tab} index={0}>
                <UserInfo />
            </TabPanel>

            <TabPanel value={tab} index={3}>
                <VignetteTypesTable />
            </TabPanel>
        </Grid>
    </Grid>
  )
}

export default MyProfile;

const useStyles = makeStyles((theme) => ({

}));