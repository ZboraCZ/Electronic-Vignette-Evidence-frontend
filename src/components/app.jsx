import Navbar from 'components/navbar'
import Router from 'routes'
import Footer from 'components/footer'
import styled from 'styled-components'
const App = (props) => {

  return (
    <AppStyled>
      <Navbar />
      <MainStyled>
        <Router />
      </MainStyled>
      <Footer/>
    </AppStyled>
  )
}

const AppStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const MainStyled = styled.div`
  flex: 1 0 auto;
`

export default App;
