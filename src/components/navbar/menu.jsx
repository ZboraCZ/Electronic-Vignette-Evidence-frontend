import styled from 'styled-components'
import Link from 'components/shared/link';

const Menu = (props) => (
  <MenuStyled>
      <Link to='domu'>Domů</Link>
      <Link to='login'>Kontakt</Link>
      <Link to='kosik'>Košík</Link>
      <Link to='prehled'>Muj prehled</Link>
  </MenuStyled>
)

export default Menu;

const MenuStyled = styled.div`
`;
