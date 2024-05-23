const Asset = require("../models/Asset");

createAsset = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide an asset",
    });
  }

  const asset = new Asset(body);

  if (!asset) {
    return res.status(400).json({ success: false, error: err });
  }

  asset
    .save()
    .then(() => {
      return res.status(200).json({
        success: true,
        id: asset._id,
        message: "Asset created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Asset not created!",
      });
    });
};

updateAsset = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Asset.findOne({ _id: req.params.id }, (err, asset) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Asset not found!",
      });
    }
    asset.name = body.name;
    asset.sku = body.sku;
    asset.clibrationDate = body.clibrationDate;
    asset.maintenaceTech = body.maintenaceTech;
    asset.calibrationPeriodicity = body.calibrationPeriodicity;
    asset.notificationReceiver = body.notificationReceiver;
    asset.fileName = body.fileName;
    asset
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: asset._id,
          message: "Asset updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Asset not updated!",
        });
      });
  });
};

deleteAsset = async (req, res) => {
  await Asset.findOneAndDelete({ _id: req.params.id }, (err, asset) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!asset) {
      return res.status(404).json({ success: false, error: `Asset not found` });
    }

    return res.status(200).json({ success: true, data: asset });
  }).catch((err) => console.log(err));
};

getAssetById = async (req, res) => {
  await Asset.findOne({ _id: req.params.id }, (err, asset) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    return res.status(200).json({ success: true, data: asset });
  }).catch((err) => console.log(err));
};

getAssets = async (req, res) => {
  await Asset.find({}, (err, assets) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!assets.length) {
      return res.status(200).json({ success: true, data: assets, message: `Asset is empty` });
    }
    return res.status(200).json({ success: true, data: assets });
  }).catch((err) => console.log(err));
};

module.exports = {
  createAsset,
  updateAsset,
  deleteAsset,
  getAssets,
  getAssetById,
};
