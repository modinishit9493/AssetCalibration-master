import React, { useEffect, useState } from "react";
import classes from "./AssetAdd.module.css";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import api from "../../api";

const AssetAdd = (props) => {
  const [files, setFiles] = useState([]);
  const [enteredSku, setEnterSku] = useState("");
  const [enteredName, setEnterName] = useState("");
  const [enteredcalibrationDate, setEntercalibrationDate] = useState("");
  const [enteredperiodicity, setEnterPeriodicity] = useState("");
  const [enteredmaintenaceTech, setEnterMaintenaceTech] = useState("");
  const [enteredNotificationReceiver, setEnterNotificationReceiver] =
    useState("");
  const [file, setFile] = useState([]);

  useEffect(() => {
    if (props._id !== "") {
      setEnterSku(props.data.data.sku);
      setEnterName(props.data.data.name);
      setEntercalibrationDate(props.data.data.clibrationDate);
      setEnterPeriodicity(props.data.data.calibrationPeriodicity);
      setEnterMaintenaceTech(props.data.data.maintenaceTech);
      setEnterNotificationReceiver(props.data.data.notificationReceiver);
      setFiles(props.data.data.fileName);
    }
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    
    let fileList = []
    if (file !== undefined) {
      file.map((item) => {
        const formData = new FormData();
        formData.append("file", item);
        formData.append("fileName", item.name);
        fileList.push(item.name);
        fileUpload(formData);
      });
    }

    const data = {
      _id: props._id,
      sku: enteredSku,
      name: enteredName,
      clibrationDate: enteredcalibrationDate,
      calibrationPeriodicity: enteredperiodicity,
      maintenaceTech: enteredmaintenaceTech,
      notificationReceiver: enteredNotificationReceiver,
      files: fileList,
    };

    props.saveData(data);
  };

  const fileUpload = async (formData) => {
    try {
      const response = await api.fileUploadToServer(formData);
      console.log(response);
    } catch (ex) {
      console.log(ex);
    }
  };

  const skuChangeHandler = (event) => {
    setEnterSku(event.target.value.trim());
  };
  const nameChangeHandler = (event) => {
    setEnterName(event.target.value.trim());
  };

  const calibrationDateHandler = (event) => {
    setEntercalibrationDate(event.target.value.trim());
  };
  const periodicityHandler = (event) => {
    setEnterPeriodicity(event.target.value.trim());
  };
  const maintenaceTechHandler = (event) => {
    setEnterMaintenaceTech(event.target.value.trim());
  };
  const notificationReceiverHandler = (event) => {
    setEnterNotificationReceiver(event.target.value.trim());
  };

  const handleUpload = async (e) => {
    setFile((oldFile) => [...oldFile, e.target.files[0]]);
  };
  return (
    <React.Fragment>
      <div className={classes.divborder}>
        <div className="row">
          <form onSubmit={submitHandler}>
            <>
              <FloatingLabel controlId="sku" label="SKU" className="mb-3">
                <Form.Control
                  type="text"
                  value={enteredSku}
                  placeholder="Enter SKU"
                  onChange={skuChangeHandler}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="name"
                label="Equipment's Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="456382"
                  value={enteredName}
                  onChange={nameChangeHandler}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="clibrationDate"
                label="Next Calibration Date"
                className="mb-3"
              >
                <Form.Control
                  type="date"
                  value={enteredcalibrationDate}
                  placeholder="Next Calibration Date"
                  onChange={calibrationDateHandler}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="calibrationPeriodicity"
                label="Calibration Periodicity"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  value={enteredperiodicity}
                  placeholder="Calibration Periodicity"
                  onChange={periodicityHandler}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="maintenaceTech"
                label="Maintenance-Tech assigned"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  value={enteredmaintenaceTech}
                  placeholder="Maintenance-Tech assigned"
                  onChange={maintenaceTechHandler}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="notificationReceiver"
                label="Notification Activated for"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="example@mail.com"
                  value={enteredNotificationReceiver}
                  onChange={notificationReceiverHandler}
                />
              </FloatingLabel>
            </>

            <Form.Group className="position-relative mb-3">
              <Form.Control type="file" onChange={handleUpload} />
            </Form.Group>

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

export default AssetAdd;
