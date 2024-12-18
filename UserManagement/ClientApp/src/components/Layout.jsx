import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

function Layout(props) {

        return (
            <>
                <NavMenu />
                <Container>
                    {props.children}
                </Container>
            </>
        );
}

export default Layout;