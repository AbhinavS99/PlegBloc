import { React, useState } from "react";
import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  Stack,
  Image,
} from "react-bootstrap";

export default function Base() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Container>
              <Image
                style={{ width: "60%", marginLeft: "10%", marginTop: "20%" }}
                src="https://raw.githubusercontent.com/AbhinavS99/PlegBloc/main/images/Logo.png"
                fluid
              />
            </Container>
          </Col>
          <Col>
            <Stack
              gap={3}
              style={{ width: "100%", marginLeft: "-10%", marginTop: "25%" }}
            >
              <Container>
                <h3>PlegBloc</h3>
                <p align="justify">
                  PlegBloc is a trustful crowdfunding platform i.e. it enables
                  the funding partners to know and check as to where and how
                  their funding is used or is proposed to be used by the
                  venture. PlegBloc upholds the principle of trustful
                  crowdfunding by enabling the investors to decide the place
                  where the capital can be spent.{" "}
                </p>
              </Container>
              <Container>
                <Stack gap={3} direction="horizontal">
                  <Button variant="primary" href="/signin">
                    Sign In
                  </Button>{" "}
                  <Button variant="outline-primary" href="/signup">
                    Sign Up
                  </Button>{" "}
                </Stack>
              </Container>
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
}
