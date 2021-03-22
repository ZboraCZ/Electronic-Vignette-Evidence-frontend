import styled from 'styled-components'
import Menu from './menu'
import Link from 'components/shared/link'
import img from 'assets/logo.png'
import Wrapper from 'components/shared/wrapper'
import { Container, Row, Col } from 'react-grid-system';  

const Navbar = (props) => (
  <NavbarStyled>
    <Wrapper>
        <Row debug nogutter>
          <Col debug>
            <Link to='/'>
              <Img src={img} />
            </Link>
          </Col>
          <Col xs='content' debug>
            <Menu />
          </Col>
        </Row>
    </Wrapper>
  </NavbarStyled>
)

export default Navbar;

const Img = styled.img`
  width: 150px;
  height: auto;
`

const NavbarStyled = styled.div`
  width: 100%;
  height: 80px;
  background: salmon;
`;