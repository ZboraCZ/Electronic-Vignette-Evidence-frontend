import styled from 'styled-components'
import Menu from './menu'
import Link from 'components/shared/link'

const Navbar = (props) => (
  <NavbarStyled>
        <Link to='/'>Elektronické dálniční známky</Link>
        <Menu />
  </NavbarStyled>
)

export default Navbar;

const NavbarStyled = styled.div`
  width: 100%;
  height: 50px;
  background: salmon;
  display: flex;
  justify-content: space-between;
`;