import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';

import { fetchUsers } from 'api/users'
import { selectUsers } from 'store/users'

const Home = () => {
  
  const dispatch = useDispatch()
  const usersState = useSelector(selectUsers)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const { users, pending, error } = usersState;

  return (
    <div>
      {
        pending && <div>Loading...</div>
      }

      {
        !!error && <div>{error}</div>
      }

      <h1>home page</h1>
      <ul>
        {
          users && users.map(user => <li key={user.id}>{user.name}</li>)
        }

      </ul>
    </div>
  )
}

export default Home;
