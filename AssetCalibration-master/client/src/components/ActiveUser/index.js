import React, { useState, useEffect, useRef } from "react";
import UserForm from "../../miniComponents/UserForm";
import api from "../api";
import { Navbar, FormControl, Form, Container, Button } from "react-bootstrap";
const CreateUser = () => {
  const [displayUserForm, setDisplayUserForm] = useState(undefined);

  const [users, setUsers] = useState("");
  const [user, setUser] = useState(undefined);

  const updatedValue = {};
  const [userObj, setUserObj] = useState();

  const fetchData = async () => {
    await api
      .getAllUsers()
      .then((result) => {
        setUsers(result.data.data);
      })
      .catch((error) => {
        //   console.log("error in fetch Data:", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, [displayUserForm]);

  const fullNameInputElement = useRef();
  const emailInputElement = useRef();
  const passwordInputElement = useRef();
  const rollInputElement = useRef();
  const idInputElement = useRef();
  const UpdateData = async () => {
    let id = idInputElement.current?.value;
    const body = {
      name: fullNameInputElement.current?.value,
      password: passwordInputElement.current?.value,
      email: emailInputElement.current?.value,
      role: rollInputElement.current?.value,
    };
    await api.updateUserById(id, body);
  };

  const DeleteData = async () => {
    let id = idInputElement.current?.value;
    await api.deleteUserById(id);
  };

  return (
    <>
      <div className="container">
        <h1 className="mb-2 text-color">Active User List</h1>

        <table>
          <tr>
            <th className="py-2">#</th>
            <th>USER ID</th>
            <th>FULL NAME</th>
            <th>POSITION</th>
            <th>Action</th>
          </tr>

          {users &&
            users.map((item, index) => (
              <tr key={index}>
                <td>{index} </td>
                <td>{item._id}</td>
                <td>{item.name + " " + item.lastname}</td>
                <td>{item.role}</td>
                <td>
                  <Button
                    className="py-0"
                    onClick={() => {
                      displayUserForm
                        ? setDisplayUserForm(false)
                        : setDisplayUserForm(true);
                      setUser(item);
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
        </table>
        {displayUserForm && user && (
          <div className="div-border-line p-3 w-100">
            <Form>
              <Form.Group
                className="mb-1 d-flex flex-row"
                controlId="formBasicEmail"
                size="sm"
              >
                <Form.Label className="w-25 text-right">
                  EMAIL ADDRESS:
                </Form.Label>
                <Form.Control
                  size="sm"
                  type="email"
                  className="text-box-color"
                  defaultValue={user.name}
                  onChange={(e) => setUserObj(e.target.value)}
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
                  defaultValue={user.role}
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
                  defaultValue={user.email}
                  ref={emailInputElement}
                />
              </Form.Group>
              <Form.Group
                className="mb-1 d-flex flex-row mt-4"
                controlId="formBasicPassword"
              >
                <Form.Label className="w-25 text-right ">USER ID:</Form.Label>
                <Form.Control
                  className="text-box-color"
                  size="sm"
                  value={user._id}
                  ref={idInputElement}
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
                    className="btn btn-danger px-3 py-1"
                    onClick={() => {
                      DeleteData();
                      setDisplayUserForm(false);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    className="btn btn-warning px-3 py-1"
                    onClick={() => {
                      setDisplayUserForm(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="btn btn-success px-3 py-1"
                    onClick={() => {
                      setDisplayUserForm(false);
                      UpdateData();
                    }}
                  >
                    Save
                  </Button>
                </div>
              </Form.Group>
            </Form>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateUser;
