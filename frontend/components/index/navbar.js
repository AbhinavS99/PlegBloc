import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function NavbarInd() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block"
            />{" "}
            PlegBloc
          </Navbar.Brand>

          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link eventKey={2} href="/aboutUs">
              About Us
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
