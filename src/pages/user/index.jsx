import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { Row, Col } from 'react-grid-system'
import styled from 'styled-components'

import { fetchUser } from 'api/user'
import { getUser } from 'store/user';

import Wrapper from 'components/shared/wrapper'
import Card from 'components/shared/card' 

const Home = () => {
  
  const dispatch = useDispatch()
  const userState = useSelector(getUser)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  console.log(userState)    

  const { pending, error, user } = userState

    
    if(pending) 
        return (
            <div>loading...</div>
        )
    
    if(error) 
        return (
            <div>error</div>
        )

    return (
        <Wrapper>
            {user && (
            <>
                <div>{user.email}</div>
                <div>{user.firstName}</div>
                <div>{user.lastName}</div>
                <div>{user.phone}</div>
            </>
            )}   
        </Wrapper>
  )
}

export default Home;
