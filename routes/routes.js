let express = require('express');
let router = express.Router();
let constant = require('../utils/constant');

// const mainController = require("../controller/mainController");
const userController = require("../controller/userController");
const hackController = require("../controller/hackController");
const adminController = require("../controller/adminController");


//user routes
router.post(constant.ROUTE_USER_REGISTERED, (req, res)=> userController.registerUser(req, res));
router.post(constant.ROUTE_GET_USER_DETAILS, (req, res)=> userController.getUserDetails(req, res));
router.post(constant.ROUTE_UPDATE_USER_DETAILS, (req, res)=> userController.updateUserDetails(req, res));
router.post(constant.ROUTE_DELETE_USER, (req, res)=> userController.deleteUser(req, res));

//hack routes
router.post("/create_hack", (req, res)=> hackController.createHack(req, res));
router.post("/update_hack", (req, res)=> hackController.updateHack(req, res));
router.post("/get_hack_all", (req, res)=> hackController.getAllHacks(req, res));
router.post("/get_hack_by_category",(req, res)=> hackController.getHacksByCategory(req,res));
router.post("/delete_hack", (req, res)=> hackController.deleteHack(req, res));


//admin routes
router.post("/create_admin",(req,res)=> adminController.registerAsAdmin(req,res))
router.post("/get_admin",(req,res)=> adminController.getAdmin(req,res))
router.post("/login_admin",(req,res)=> adminController.login(req,res))
router.post("/update_admin_details",(req,res)=>adminController.updateDetails(req,res))
router.post("/add_available_courses",(req, res)=>adminController.addAvailableCourse(req,res))
router.post("/delete_course",(req, res)=>adminController.deleteCourse(req,res))
router.post("/add_available_branch",(req, res)=>adminController.addAvailableBranch(req,res))


module.exports = router;