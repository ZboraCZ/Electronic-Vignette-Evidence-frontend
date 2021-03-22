import styled from 'styled-components'
import Wrapper from 'components/shared/wrapper'
import Card from 'components/shared/card'

const Footer = () => (
    <FooterStyled>
        <Wrapper>
            <Card>
                Footer
            </Card>
        </Wrapper>
    </FooterStyled>
)

const FooterStyled = styled.footer`
    width: 100%;
    flex-shrink: 0;
`;

export default Footer;

