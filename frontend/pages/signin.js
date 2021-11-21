import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SignInForm from "../components/signin/form";
export default function SignIn() {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <SignInForm />
          </Col>
          <Col>
            <SignInForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
