import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function Footer() {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        fixed="bottom"
      >
        <Container>
          <Navbar.Brand href="/">
            Team-5 (Abhinav Sharma, Aditya Singh Rathore, Shaney Waris)
          </Navbar.Brand>

          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link
              eventKey={2}
              href="https://github.com/AbhinavS99/PlegBloc"
            >
              Github
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
