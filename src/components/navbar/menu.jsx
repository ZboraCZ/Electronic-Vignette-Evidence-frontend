import styled from 'styled-components'
import Link from 'components/shared/link';

const Menu = (props) => (
  <MenuStyled>
      <Link to='domu'>Domů</Link>
      <Link to='kontakt'>Kontakt</Link>
      <Link to='kosik'>Košík</Link>
  </MenuStyled>
)

export default Menu;

const MenuStyled = styled.div`
 
`;
