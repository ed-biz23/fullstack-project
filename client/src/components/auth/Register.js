import { useState } from "react";
import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";

const useModalState = (defaultOpen = false) => {
  const [isOpen, setOpen] = useState(defaultOpen);
  return { isOpen, toggle: () => setOpen(isOpen => !isOpen) };
};

export default function Register({ buttonLabel, className }) {
  const { isOpen, toggle } = useModalState();

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={isOpen} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {/* {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null} */}
          <Form onSubmit={null}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={null}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={null}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
