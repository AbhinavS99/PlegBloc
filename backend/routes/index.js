const express = require("express");
const router = express.Router();
console.log("Router is Loaded.");

const homeController = require("../controllers/home_controller");

router.get("/", homeController.home);
router.post("/signup", homeController.signup);
router.post("/signin", homeController.signin);
router.post("/createCampaign", homeController.createCampaign);
router.post("/verifyOtp", homeController.verifyOtp);

module.exports = router;