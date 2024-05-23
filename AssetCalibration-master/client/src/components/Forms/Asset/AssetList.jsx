import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import api from "../../api";
import TableBody from "./TableBody";
import AssetAdd from "./AssetAdd";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import { toast } from "react-toastify";

const AssetList = () => {
  let navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [showAdd, setShowAdd] = useState(false);
  const [assets, setAssets] = useState([]);
  const [asset, setAsset] = useState({});
  const [id, setId] = useState("");
  const fetchData = async () => {
    await api
      .getAllAssets()
      .then((result) => {
        setAssets(result.data);
        console.log(result.data)
      })
      .catch((error) => {
        console.log("error in fetch Data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddAsset = () => {
    setShowAdd(true);
  };

  const handleEdit = async (id) => {
    if(!authCtx.isLoggedIn){
      toast.error("You need to login first!", {
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
    const entity = await api.getAssetById(id);
    setAsset(entity.data);
    setShowAdd(true);
  };

  const handleDelete = async (id) => {
    if(!authCtx.isLoggedIn){
      toast.error("You need to login first!", {
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
    if (window.confirm(`Do tou want to delete the Entity ${id} permanently?`)) {
      await api.deleteAssetById(id);
      fetchData();
    }
  };

  const handleSaveData = async (data) => {
    if (data._id === "") {
      let payLoad = {
        sku: data.sku,
        name: data.name,
        clibrationDate: data.clibrationDate,
        calibrationPeriodicity: data.calibrationPeriodicity,
        maintenaceTech: data.maintenaceTech,
        notificationReceiver: data.notificationReceiver,
        fileName: data.files,
      };

      await api.insertAsset(payLoad).then((res) => {
        setShowAdd(false);
        fetchData();
        setAsset({});
        setId("");
      });
    } else {
      await api.updateAssetById(id, data).then((res) => {
        setShowAdd(false);
        setAsset({});
        setId("");
        fetchData();
      });
    }
  };

  const handleReturnClick = (data) => {
    setShowAdd(false);
    setAsset({});
    setId("");
  };

  const handleView = async (id) => {
    const entity = await api.getAssetById(id);
    navigate("/assetview", { state: { data: entity.data.data } });
  };

  return (
    <React.Fragment>
      <Container>
      {authCtx.isLoggedIn && showAdd && (
        <AssetAdd
          saveData={handleSaveData}
          onCancel={handleReturnClick}
          _id={id}
          data={asset}
        />
      )}
      {authCtx.isLoggedIn && !showAdd && (
        <Button
          type="button"
          className="btn btn-primary"
          onClick={handleAddAsset}
        >
          Create New Asset <FontAwesomeIcon icon={faAdd} />
        </Button>
      )}
      {!showAdd && (
        <div className="mt-2">
          <TableBody
            data={assets}
            onEditClick={handleEdit}
            onDeleteClick={handleDelete}
            onViewClick={handleView}
            isLoggedIn= {authCtx.isLoggedIn}
          />
        </div>
      )}
      </Container>
    </React.Fragment>
  );
};

export default AssetList;
