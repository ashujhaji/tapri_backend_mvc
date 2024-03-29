let express = require('express');
let router = express.Router();
let constant = require('../utils/constant');

const userController = require("../controller/userController");
const adminController = require("../controller/adminController");
const postController = require("../controller/postController");
const jobController = require("../controller/jobController");


//user routes
router.post(constant.ROUTE_USER_REGISTERED, (req, res)=> userController.registerUser(req, res));
router.post(constant.ROUTE_GET_USER_DETAILS, (req, res)=> userController.getUserDetails(req, res));
router.post(constant.ROUTE_UPDATE_USER_DETAILS, (req, res)=> userController.updateUserDetails(req, res));
router.post(constant.ROUTE_DELETE_USER, (req, res)=> userController.deleteUser(req, res));

//posts routes
router.post("/create_post", (req, res)=> postController.createPost(req, res));
router.post("/update_post", (req, res)=> postController.updatePost(req, res));
router.post("/get_all_posts", (req, res)=> postController.getAllPosts(req, res));
router.post("/get_post_by_user",(req, res)=> postController.getPostsByUser(req,res));
router.post("/delete_post", (req, res)=> postController.deletePost(req, res));
router.post("/add_comment_on_post",(req,res)=>postController.addCommentOnPost(req,res));
router.post("/delete_comment_from_post",(req,res)=>postController.deleteCommentFromPost(req,res));


//admin routes
router.post("/create_admin",(req,res)=> adminController.registerAsAdmin(req,res))
router.post("/get_admin",(req,res)=> adminController.getAdmin(req,res))
router.post("/login_admin",(req,res)=> adminController.login(req,res))
router.post("/update_admin_details",(req,res)=>adminController.updateDetails(req,res))
router.post("/add_student",(req,res)=>adminController.addStudentDetail(req,res))
router.post("/get_student_details",(req,res)=>adminController.getStudentDetail(req,res))
router.post("/update_student_details",(req,res)=>adminController.updateStudentDetails(req,res))
router.post("/add_placement_record",(req,res)=>adminController.addPlacementRecord(req,res))


//job routes
router.post("/update_job_details",(req,res)=>jobController.updateJobDetails(req,res))
router.post("/get_all_jobs_by_institute", (req, res)=> jobController.getAllJobsByInstituteId(req, res));
router.post("/get_job_by_id", (req, res)=> jobController.getJobById(req, res));
router.post("/delete_job_by_id", (req, res)=> jobController.deleteJobById(req, res));
router.post("/apply_for_job", (req, res)=> jobController.applyForJob(req, res));

router.get("/pojo_route",(req,res)=>adminController.pojoRoute(req,res))

module.exports = router;