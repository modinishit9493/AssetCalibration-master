import React, { useState, useEffect, useRef } from "react";
import UserForm from "../../miniComponents/UserForm";
import { Navbar, FormControl, Form, Container, Button } from "react-bootstrap";
import api from "../api";
const CreateUser = () => {
  const fullNameInputElement = useRef();
  const emailInputElement = useRef();
  const passwordInputElement = useRef();
  const rollInputElement = useRef();
  const idInputElement = useRef();
  const InsertData = async () => {
    const body = {
      name: fullNameInputElement.current?.value,
      password: passwordInputElement.current?.value,
      email: emailInputElement.current?.value,
      role: rollInputElement.current?.value,
    };

    await api
      .insertUser(body)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log("error in fetch Data:", error);
      });
  };

  return (
    <>
      <div className="container">
        <h1 className="mb-2 text-color">Create User</h1>
        <div className="div-border-line p-3 w-100">
          <Form>
            <Form.Group
              className="mb-1 d-flex flex-row"
              controlId="formBasicEmail"
              size="sm"
            >
              <Form.Label className="w-25 text-right">Name:</Form.Label>
              <Form.Control
                size="sm"
                type="email"
                className="text-box-color"
                ref={fullNameInputElement}
              />
            </Form.Group>

            <Form.Group
              className="mb-1 d-flex flex-row text-color"
              controlId="formBasicPassword"
            >
              <Form.Label className="w-25 float-right text-right">
                POSITION:
              </Form.Label>
              <Form.Control
                size="sm"
                className="text-box-color"
                ref={rollInputElement}
              />
            </Form.Group>
            <Form.Group
              className="mb-1 d-flex flex-row text-color"
              controlId="formBasicPassword"
            >
              <Form.Label className="w-25 text-right text-color">
                EMAIL:
              </Form.Label>
              <Form.Control
                size="sm"
                className="text-box-color"
                ref={emailInputElement}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex flex-row "
              controlId="formBasicPassword"
            >
              <Form.Label className="w-25 text-right"> PASSWORD:</Form.Label>
              <Form.Control
                className="text-box-color"
                size="sm"
                type="password"
                ref={passwordInputElement}
              />
            </Form.Group>
            <Form.Group
              className="d-flex flex-column"
              controlId="formBasicPassword"
            >
              <div className="align-self-end">
                <Button
                  className="btn btn-success px-3 py-1"
                  onClick={InsertData}
                >
                  Submit
                </Button>
              </div>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
