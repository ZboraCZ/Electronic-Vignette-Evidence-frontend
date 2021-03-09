import styled from 'styled-components'
import { Link } from "react-router-dom";

const LinkStyled = styled(Link)`
  color: black;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default LinkStyled;

