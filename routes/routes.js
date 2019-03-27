let express = require('express');
let router = express.Router();
let constant = require('../utils/constant');

const userController = require("../controller/userController");
const adminController = require("../controller/adminController");
const postController = require("../controller/postController");


//user routes
router.post(constant.ROUTE_USER_REGISTERED, (req, res)=> userController.registerUser(req, res));
router.post(constant.ROUTE_GET_USER_DETAILS, (req, res)=> userController.getUserDetails(req, res));
router.post(constant.ROUTE_UPDATE_USER_DETAILS, (req, res)=> userController.updateUserDetails(req, res));
router.post(constant.ROUTE_DELETE_USER, (req, res)=> userController.deleteUser(req, res));

//posts routes
router.post("/create_post", (req, res)=> postController.createPost(req, res));
router.post("/update_post", (req, res)=> postController.updatePost(req, res));
router.post("/get_hack_posts", (req, res)=> postController.getAllPosts(req, res));
router.post("/get_post_by_user",(req, res)=> postController.getPostsByUser(req,res));
router.post("/delete_post", (req, res)=> postController.deletePost(req, res));


//admin routes
router.post("/create_admin",(req,res)=> adminController.registerAsAdmin(req,res))
router.post("/get_admin",(req,res)=> adminController.getAdmin(req,res))
router.post("/login_admin",(req,res)=> adminController.login(req,res))
router.post("/update_admin_details",(req,res)=>adminController.updateDetails(req,res))
router.post("/add_student",(req,res)=>adminController.addStudentDetail(req,res))
router.post("/get_student_details",(req,res)=>adminController.getStudentDetail(req,res))
router.post("/update_student_details",(req,res)=>adminController.updateStudentDetails(req,res))
router.post("/add_placement_record",(req,res)=>adminController.addPlacementRecord(req,res))

router.get("/pojo_route",(req,res)=>adminController.pojoRoute(req,res))

module.exports = router;