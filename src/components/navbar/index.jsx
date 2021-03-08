import styled from 'styled-components'
import { Link } from "react-router-dom";

const NavbarStyled = styled.div`
  width: 100%;
  height: 50px;
  background: salmon;
`;

const LinkStyled = styled(Link)`
  padding: 15px;
`;

const Navbar = (props) => (
  <NavbarStyled>
      <LinkStyled to='domu'>Domů</LinkStyled>
      <LinkStyled to='kontakt'>Kontakt</LinkStyled>
      <LinkStyled to='kosik'>Košík</LinkStyled>
  </NavbarStyled>
)

export default Navbar;
