import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import styled from 'styled-components'

import { fetchVignetteTypes } from 'api/vignette-types'
import { Row, Col } from 'react-grid-system'

import Wrapper from 'components/shared/wrapper'
import Card from 'components/shared/card' 

const Home = () => {
  
  const dispatch = useDispatch()
  //const vignetteState = useSelector(vignetteTypes)

  useEffect(() => {
    dispatch(fetchVignetteTypes())
  }, [dispatch])

  //const { types, pending, error } = vignetteState;
  const data = {}
  const { pending, error } = data

  return (
    <Wrapper>
      <Row>
        <Col xs={8}><Card>KARTA BIG</Card></Col>
        <Col xs={4}><Card>KARTA SMALL</Card></Col>
      </Row>

      <Row>
        <Col xs={4}><Card>KARTA SMALL</Card></Col>
        <Col xs={4}><Card>KARTA SMALL</Card></Col>
        <Col xs={4}><Card>KARTA SMALL</Card></Col>
      </Row>
    </Wrapper>
  )
}

export default Home;
