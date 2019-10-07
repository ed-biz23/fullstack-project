import { useState, useEffect } from "react";
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

import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

const useModalState = (defaultOpen = false) => {
  const [isOpen, setOpen] = useState(defaultOpen);
  const dispatch = useDispatch();
  return {
    isOpen,
    toggle: () => {
      dispatch(clearErrors());
      setOpen(isOpen => !isOpen);
    }
  };
};

export default function SignIn({ buttonLabel }) {
  const { isOpen, toggle } = useModalState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const mapStateToProps = useSelector(state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    const { error, isAuthenticated } = mapStateToProps;
    // Check for register error
    if (error.id === "LOGIN_FAIL") {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }

    // If authenticated, close modal
    if (isAuthenticated) {
      toggle();
    }
  }, [mapStateToProps.error, mapStateToProps.isAuthenticated]);

  const onChange = e => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const onSubmit = e => {
    e.preventDefault();

    // Create user object
    const user = {
      email,
      password
    };

    // Attempt to register
    dispatch(login(user));
  };

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Sign In</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={onChange}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Sign In
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
