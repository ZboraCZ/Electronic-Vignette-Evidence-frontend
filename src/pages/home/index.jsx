import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Grid, Button } from '@material-ui/core';
import { fetchVignetteTypes } from 'api/vignette-types';
import { makeStyles } from '@material-ui/core/styles';
import { vignetteTypes } from 'store/vignettes';
import profileImg from 'assets/profile.png';
import VignetteTypes from './vignette-types'
import Hidden from '@material-ui/core/Hidden';
import Alert from 'components/shared/alert';
import Loader from 'components/shared/loader'
import { Link } from 'react-router-dom';

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const vignetteState = useSelector(vignetteTypes)

  useEffect(() => {
    dispatch(fetchVignetteTypes())
  }, [dispatch])

  const { types, pending, error } = vignetteState;
 
  return (
    <div>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
              {pending ? (
                <div className={classes.loader}>
                  <Loader />
                </div>
              ) : (
                <>
                  {!error ? <VignetteTypes types={types} /> : <Alert error={error} />}
                </>
              )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Hidden xsDown>
            <Paper className={classes.paper}>
              <div className={classes.login}>
                <div className={classes.img}>
                  <img src={profileImg} className={classes.profileImg} alt='login label'/>
                </div>
                <Button 
                  variant="contained" 
                  color="primary"
                  to= '/login'
                  component={Link}
                >
                  Přihlásit se
                </Button>
              </div>
            </Paper>
          </Hidden>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100%'
  },
  paper: {
    padding: theme.spacing(1),
  },
  login: {
    height: '300px',
    flexDirection: 'column',
    textAlign: 'center'
  },
  img: {
    overflow: 'hidden'
  },
  profileImg: {
    maxWidth: '250px',
    width: '100%',
    height: 'auto'
  },
  loader: {
    height: '300px'
  }
}));