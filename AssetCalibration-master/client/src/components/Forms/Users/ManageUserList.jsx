import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AuthContext from "../../../store/auth-context";
import apis from "../../api";
import TableBody from "./TableBody";
import UserAdd from "./UserAdd";

const ManageUserList = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [id, setId] = useState("");
  const authCtx = useContext(AuthContext);

  const fetchData = async () => {
    await apis
      .getAllUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        toast.error("fetching data was failed!", {
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddUser = () => {
    setShowAdd(true);
  };

  const handleEdit = async (id) => {
    if(authCtx.getRole() === 'Staff'){
      toast.error("You don't have permission to proceed with this operation", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return
    }

    setId(id);
    const entity = await apis.getUserById(id);
    setUser(entity.data);
    setShowAdd(true);
  };

  const handleDelete = async (id) => {
    if(authCtx.getRole() === 'Staff'){
      toast.error("You don't have permission to proceed with this operation", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return
    }
    if (window.confirm(`Do tou want to delete the user permanently?`)) {
      await apis.deleteUserById(id);
      fetchData();
    }
  };

  const handleSaveData = async (data) => {
    if (data._id === "") {
      let payLoad = {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        role: data.role,
      };

      await apis
        .signup(payLoad)
        .then((res) => {
          if (!res.data.success) {
            toast.error(res.data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            setShowAdd(false);
            fetchData();
            setUser({});
            setId("");
          }
        })
        .catch((error) => {
          toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      await apis.insertUser(payLoad).then((res) => {
        setShowAdd(false);
        fetchData();
        setUser({});
        setId("");
      });
    } else {
      await apis.updateUserById(id, data).then((res) => {
        setShowAdd(false);
        setUser({});
        setId("");
        fetchData();
      });
    }
  };
  const handleReturnClick = () => {
    setShowAdd(false);
    setUser({});
    setId("");
  };

  return (
    <React.Fragment>
      <Container>
        {showAdd && authCtx.getRole() !== 'Staff' && (
          <UserAdd
            saveData={handleSaveData}
            onCancel={handleReturnClick}
            _id={id}
            data={user}
          />
        )}
        {!showAdd && authCtx.getRole() !== 'Staff' &&(
          <Button
            type="button"
            className="btn btn-primary"
            onClick={handleAddUser}
          >
            Create New User <FontAwesomeIcon icon={faAdd} />
          </Button>
        )}
        {!showAdd && (
          <div className="mt-2">
            <TableBody
              data={users}
              onEditClick={handleEdit}
              onDeleteClick={handleDelete}
              role= {authCtx.getRole()}
            />
          </div>
        )}
      </Container>
    </React.Fragment>
  );
};

export default ManageUserList;
