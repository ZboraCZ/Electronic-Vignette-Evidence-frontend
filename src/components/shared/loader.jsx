import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const Loader = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root} {...props}>
      <CircularProgress />    
    </div>
  )
}
export default Loader;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
}));