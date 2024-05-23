const express = require("express");
const AssetCtrl = require("../controllers/Asset-ctrl");
const AuthController = require("../controllers/Auth");
const emailNotification = require("../controllers/emailNotification");
const router = express.Router();

router.post("/asset", AssetCtrl.createAsset);
router.put("/asset/:id", AssetCtrl.updateAsset);
router.delete("/asset/:id", AssetCtrl.deleteAsset);
router.get("/asset/:id", AssetCtrl.getAssetById);
router.get("/assets", AssetCtrl.getAssets);
router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);
router.post("/notifications", emailNotification.sendMail);

router.get("/users", AuthController.getUsers);
router.post("/user", AuthController.insertUser);
router.get("/user/:id", AuthController.getUserById);
router.put("/user/:id", AuthController.updateUser);
router.delete("/user/:id", AuthController.deleteUser);

module.exports = router;
