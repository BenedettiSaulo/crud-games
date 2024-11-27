import { Container, Nav, Navbar } from "react-bootstrap";

export function Header() {
    return (
        <Navbar expand="lg" className="nav">
            <Container>
                <Navbar.Brand>React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link>Home</Nav.Link>
                    <Nav.Link>Link</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}