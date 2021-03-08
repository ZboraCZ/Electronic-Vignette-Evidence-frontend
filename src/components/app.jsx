import Navbar from 'components/navbar'
import Router from 'routes'

const App = (props) => {

  return (
    <div>
      <Navbar />
      <Router />
    </div>
  )
}

export default App;

/*

useEffect(() => {
  props.fetchUsers()
}, [])

const mapStateToProps = state => ({
  users: state.users,
})

export default connect(mapStateToProps, { fetchPosts })(App);

*/
