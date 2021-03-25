import Navbar from 'components/navbar'
import Router from 'routes'
import Footer from 'components/footer'
import Wrapper from 'components/shared/wrapper'
import { makeStyles } from '@material-ui/core/styles';

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Navbar />
      <main className={classes.main}>
        <Wrapper>
          <Router />
        </Wrapper>
      </main>
      <Footer />
    </div>
  )
}
export default App;

const useStyles = makeStyles(theme => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },
  main: {
    flexGrow: '1',
    marginTop: '70px',
    marginBottom: '30px',
    background: theme.background
  }
}));
