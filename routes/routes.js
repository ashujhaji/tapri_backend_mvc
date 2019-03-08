let express = require('express');
let router = express.Router();

// const mainController = require("../controller/mainController");
const userController = require("../controller/userController");
const hackController = require("../controller/hackController");


//user routes
router.post("/create_new_user", (req, res) => userController.newUserCreation(req, res));
router.post("/register", (req, res)=> userController.registerUser(req, res));
router.post("/get_user_details", (req, res)=> userController.getUserDetails(req, res));
router.post("/update_user_details", (req, res)=> userController.updateUserDetails(req, res));
router.post("/delete_user", (req, res)=> userController.deleteUser(req, res));

//hack routes
router.post("/create_hack", (req, res)=> hackController.createHack(req, res));
router.post("/update_hack", (req, res)=> hackController.updateHack(req, res));
router.post("/get_hack_all", (req, res)=> hackController.getAllHacks(req, res));
router.post("/get_hack_by_category",(req, res)=> hackController.getHacksByCategory(req,res));
router.post("/delete_hack", (req, res)=> hackController.deleteHack(req, res));


module.exports = router;