import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import LoadingButton from 'components/shared/loading-button'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import { fetchUser } from 'api/user';
import { getUser } from 'store/user';
import { Card, CardHeader, Avatar, IconButton, Grid } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Loader from 'components/shared/loader';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import UserInfo from './user-info';

import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

import { patchUser } from 'api/user'


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        {...other}
      >
        {value === index && children}
      </div>
    );
  }

  
const MyProfile = () => {
    
  const classes = useStyles();
  const dispatch = useDispatch();
  const userState = useSelector(getUser);

  const [value, setValue] = useState(0);
  const [isEditing, setIsEditing] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [localUser, setLocalUser] = useState(null)

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditing = () => {
    handleClose()
    setIsEditing(!isEditing)
  }

  const handleChange = (event, newValue) => setValue(newValue); 

  const saveChanges = () => {
    dispatch(patchUser(localUser))  
    setIsEditing(false)
  }

  const cancelEditing = () => {
    setLocalUser(user)
    setIsEditing(false)
  }

  useEffect(() => {
    dispatch(fetchUser(1))
  }, [dispatch]);
  
  const { user, pending, error } = userState; 

  useEffect(() => {
    !!user && setLocalUser(user)
  }, [user])

  return (
    <div className={classes.root}>
        <Grid container>
            <Grid item xs={4}>
                <Paper className={classes.leftPanel}>
                    <Tabs
                        orientation='vertical'
                        value={value}
                        onChange={handleChange}
                        className={classes.tabs}
                    >
                        <Tab label='Informace' />
                        <Tab label='Historie známek' />
                        <Tab label='Platební údaje' />
                    </Tabs>
                </Paper>
            </Grid>
            
            <Grid item xs={8}>
                <Grid container>                    
                    <Paper className={classes.paper}>
                    {
                        (!localUser || pending) ? <Loader className={classes.loader}/> : (
                        <Grid container>
                            <Grid item xs={11}>
                                <TabPanel value={value} index={0} className={classes.content}>
                                    <UserInfo user={localUser} setUser={user => setLocalUser(user)} isEditing={isEditing} />
                                </TabPanel>
                            </Grid>

                            <Grid item xs={1}>
                                {!isEditing && (
                                <>
                                    <IconButton aria-label='settings' onClick={handleClick}>  
                                        <MoreVertIcon />
                                    </IconButton>
                                    
                                    <Menu
                                        id="long-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={() => handleEditing()}>Editovat</MenuItem>
                                    </Menu>
                                </>
                                )}
                            </Grid>
                            {isEditing && (
                                <Grid item xs={12}>
                                    <Grid container justify='flex-end' className={classes.actionButtons}>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            className={classes.actionButton}
                                            onClick={cancelEditing}
                                        >
                                            Zrušit
                                        </Button>

                                        <LoadingButton
                                            variant="outlined"
                                            color="primary"
                                            className={classes.actionButton}
                                            onClick={saveChanges}
                                            loading={pending}
                                        >
                                            Uložit změny    
                                        </LoadingButton>
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    )}
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    </div>
  )
}

export default MyProfile;

const useStyles = makeStyles((theme) => ({
  leftPanel: {
    width: '300px'
  },
  loader: {
    paddingTop: '15px'
  },
  paper: {
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    width: '100%',
    height: 'auto'
  },
  actionButtons: {
    paddingRight: theme.spacing(2)
  },
  actionButton: {
    marginLeft: theme.spacing(2)
  },
  content: {
    paddingTop: theme.spacing(4)
  },
  label: {
    color: theme.palette.text.secondary
  }
}));