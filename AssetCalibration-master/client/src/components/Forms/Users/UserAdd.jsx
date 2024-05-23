import React, { useEffect, useState } from "react";
import classes from "./UserAdd.module.css";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import api from "../../api";
import { toast, ToastContainer } from "react-toastify";

const UserAdd = (props) => {
  const [enteredLastname, setLastName] = useState("");
  const [enteredName, setEnterName] = useState("");
  const [enteredEmail, setEmail] = useState("");
  const [enteredPassword, setPassword] = useState("");
  const [enteredConfirmPassword, setConfirmPassword] = useState("");
  const [enteredRole, setRole] = useState("");
  useState("");

  useEffect(() => {
    if (props._id !== "") {
      setLastName(props.data.data.lastname);
      setEnterName(props.data.data.name);
      setEmail(props.data.data.email);
      setPassword(props.data.data.password);
      setConfirmPassword(props.data.data.password);
      setRole(props.data.data.role);
    }
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      enteredLastname === "" ||
      enteredName === "" ||
      enteredEmail === "" ||
      enteredPassword === "" ||
      enteredRole === ""
    ) {
      toast.error("All inputs should be fill", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (enteredPassword !== enteredConfirmPassword) {
      toast.error("The password and confrim password should be same", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const data = {
      _id: props._id, 
      name: enteredName,
      lastname: enteredLastname,
      email: enteredEmail,
      password: enteredPassword,
      role: enteredRole,
    };

    props.saveData(data);
  };

  return (
    <React.Fragment>
      <div className={classes.divborder}>
        <div className="row">
          <form onSubmit={submitHandler}>
            <>
              <FloatingLabel controlId="name" label="Name" className="mb-3">
                <Form.Control
                  type="text"
                  value={enteredName}
                  placeholder="John"
                  onChange={(e) => setEnterName(e.target.value.trim())}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="lastname"
                label="Last Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Smith"
                  value={enteredLastname}
                  onChange={(e) => setLastName(e.target.value.trim())}
                />
              </FloatingLabel>

              <FloatingLabel controlId="email" label="E-Mail" className="mb-3">
                <Form.Control
                  type="email"
                  value={enteredEmail}
                  placeholder="example@mail.com"
                  onChange={(e) => setEmail(e.target.value.trim())}
                />
              </FloatingLabel>

              <FloatingLabel controlId="role" label="Role" className="mb-3">
                <select className="form-control" name="role" id="role"  onChange={(e) => setRole(e.target.value.trim())} value={enteredRole}>
                  <option value="" defaultValue="">
                    --Select Role --
                  </option>
                  <option value="Supervisor">Maintenance Supervisor</option>
                  <option value="Staff">Maintenance Staff</option>
                </select>
              </FloatingLabel>

              <FloatingLabel
                controlId="password"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  value={enteredPassword}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value.trim())}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="confirmpassword"
                label="Confrim Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  value={enteredConfirmPassword}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value.trim())}
                />
              </FloatingLabel>
            </>
            <Button type="submit" className="btn btn-success mb-2">
              Save
            </Button>
            <Button
              type="Button"
              className="btn btn-primary ms-1 mb-2"
              onClick={props.onCancel}
            >
              Cancel
            </Button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserAdd;
