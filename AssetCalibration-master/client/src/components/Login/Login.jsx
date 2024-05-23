import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "../UI/Card/Card";
import { Container, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import AuthContext from "../../store/auth-context";
import { signup, login } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authCtx = useContext(AuthContext);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    login({ email, password })
      .then((res) => {
        if(res.data !== undefined && res.data.success){
          return res.data.user;
        } else{
          return res.json().then(data => {
            let errorMessage = 'Authentication failed!';
            throw new Error(errorMessage);
          })
        }
      }).then(data => {
         authCtx.login(data)
         navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        toast.error("The Username or Password is wrong!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="2"></Col>
          <Col md="auto">
            <div className="col-12" style={{ marginTop: "100px" }}>
              <Card>
                <Form onSubmit={handleSubmit}>
                  <Form.Group
                    size="lg"
                    controlId="email"
                    className="form-group"
                  >
                    <Form.Label className="form-lbl">Email</Form.Label>
                    <Form.Control
                      autoFocus
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    size="lg"
                    controlId="password"
                    className="form-group"
                  >
                    <Form.Label className="form-lbl">Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    className="btn-custom mt-2"
                    type="submit"
                    disabled={!validateForm()}
                  >
                    Login
                  </Button>
                  <br />
                  <Button className="btn btn-custom1 mt-2" type="button">
                    Recover
                    <br />
                    Password
                  </Button>
                </Form>
              </Card>
            </div>
          </Col>
          <Col xs lg="2"></Col>
        </Row>
      </Container>
    </>
  );
}
