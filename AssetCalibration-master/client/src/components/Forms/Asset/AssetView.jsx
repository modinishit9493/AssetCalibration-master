import React, { useEffect, useState } from "react";
import classes from "./AssetAdd.module.css";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import MainHeader from "../../MainHeader/MainHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faXmark } from "@fortawesome/free-solid-svg-icons";

const AssetView = (props) => {
  let navigate = useNavigate();
  const [enteredSku, setEnterSku] = useState("");
  const [enteredName, setEnterName] = useState("");
  const [enteredcalibrationDate, setEntercalibrationDate] = useState("");
  const [enteredperiodicity, setEnterPeriodicity] = useState("");
  const [enteredmaintenaceTech, setEnterMaintenaceTech] = useState("");
  const [enteredNotificationReceiver, setEnterNotificationReceiver] =
    useState("");
  const { state } = useLocation();
  useEffect(() => {
    if (state !== undefined) {
      setEnterSku(state.data.sku);
      setEnterName(state.data.name);
      setEntercalibrationDate(state.data.clibrationDate);
      setEnterPeriodicity(state.data.calibrationPeriodicity);
      setEnterMaintenaceTech(state.data.maintenaceTech);
      setEnterNotificationReceiver(state.data.notificationReceiver);
    }
  }, [state]);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <React.Fragment>
      <Container>
        <section className="mt-3">
          <table className="table table-striped table-hover  table-bordered">
            <thead className="table-light">
              <tr>
                <th scope="col"></th>
                <th scope="col">Calibration Date</th>
                <th scope="col">SKU</th>
                <th scope="col">Equipment</th>
                <th scope="col">Maintenance-Tech</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>{enteredcalibrationDate}</td>
                <td>{enteredSku}</td>
                <td>{enteredName}</td>
                <td>{enteredmaintenaceTech}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger me-1"
                    onClick={handleClose}
                  >
                    Close{" "}
                    <i>
                      <FontAwesomeIcon icon={faXmark} />
                    </i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div className={classes.divborder}>
            <div className="row">
              <>
                <FloatingLabel controlId="sku" label="SKU" className="mb-3">
                  <Form.Control
                    type="text"
                    value={enteredSku}
                    readOnly
                    placeholder="Enter SKU"
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
                  />
                </FloatingLabel>
              </>
            </div>
          </div>
        </section>
      </Container>
    </React.Fragment>
  );
};

export default AssetView;
