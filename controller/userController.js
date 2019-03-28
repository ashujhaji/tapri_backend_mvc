let User = require('../model/user');
let express = require('express');
let jwt = require('jsonwebtoken');
let tokenHelper = require('../helper/tokenHelper')
let uuid = require('uuid');
let constant = require('../utils/constant');
let adminController = require('../controller/adminController');


//register user with google id
/*
request body params are :->
3)user_gid (mandatory)
4)user_name
5)user_dp
6)user_email
---------------------------------------------
response params are :->
logged in / signed up message
*/
module.exports.registerUser = (req, res)=>{
	var jwtToken;
	User.find({user_gid : req.body.user_gid}, (err, docs)=> {
	    if (docs.length){
	    	res.json({
	        	status:true,
	        	mesaage:"User logged in",
	        	data : docs})
	    }else{
	       	User.create(req.body)
	       		.then((user,err2)=>{
	       			if (err2) {
						res.json({
	        				status:true,
	        				mesaage:"Error occured while registering"})
	       				return}
	       			tokenHelper.signNewToken(req.body.user_gid).then((resolve)=>{
	       				jwtToken = resolve;
	       				User.updateOne({user_gid:req.body.user_gid},
	       					{token:resolve},
	       					(err3,affected,resp)=>{
	       						if (err3) {
									res.json({
	        							status:false,
	        							mesaage:"Failed to authenticate"})
	       							return
	       						}
	        						res.json({
	        							status:true,
	        							mesaage:constant.USER_REGISTERED,
	        							data:[{token:jwtToken}]})
	        					})
	        			},(reject)=>{
	     					res.json({
	     						status:false,
	        					mesaage:constant.TOKEN_GENERATION_FAILED
	     				})
	       		})
	      	})
	    }
    });
}


//get user details
/*
request body params are :->
1)token (mandatory)
2)user_gid (mandatory)
---------------------------------------------
response params are :->
complete user schema
*/
module.exports.getUserDetails = (req, res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		User.find({user_gid : req.body.user_gid}, (err, docs) =>{
	        if (docs.length){
	        	res.json({
	        	status:true,
	        	mesaage:"User Found",
	        	data : docs})
	        }else{
	        	res.json({
	        		status:false,
	        		mesaage:constant.USER_NOT_EXIST
	        	})
	        }
    	});
	},(reject)=>{
		res.json({
			status:false,
			mesaage : constant.VERIFICATION_FAILED_MSG})
		})
}



//update user details
/*
request body params are :->
1)token (mandatory)
2)user_gid (mandatory)
3)user_name
4)user_dp
5)user_email
---------------------------------------------
response params are :->
updation message
*/
module.exports.updateUserDetails = (req, res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		User.updateOne({user_gid: req.body.user_gid},req.body,
			(err, affected, resp)=>{
				if (err) {
					res.json({status:false,
	        			mesaage:err})
					return
				}
				adminController.getCollegeName(req.body.institute_id).then((resolve)=>{
					User.updateOne({user_gid:req.body.user_gid},{college_name:resolve},
						(err2,affected2,resp2)=>{
							if (err2) {
								res.json({status:false,
				        			mesaage:err2})
								return
							}
							res.json({status:true,
	        					mesaage:constant.USER_DETAILS_UPDATED})
							})
				},(reject)=>{
					res.json({status:false,
	        				mesaage:"Not Found"})
				})
		})
	},(reject)=>{
		res.json({
			status:false,
				mesaage : constant.VERIFICATION_FAILED_MSG
		})
	})
}


//delete user
/*
request body params are :->
1)token (mandatory)
2)user_gid (mandatory)
---------------------------------------------
response params are :->
deletion message
*/
module.exports.deleteUser = (req, res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		User.find({user_gid : req.body.user_gid}, (err, docs) =>{
	        if (docs.length){
	            User.deleteOne({user_gid: req.body.user_gid }, (err2)=> {
					if (err2) {
					    res.send(err2);
					    return;
					    }
					res.send(constant.USER_DELETED);
				});
	        }else{
	            res.send(constant.USER_NOT_EXIST)
	        }
    	});
	},(reject)=>{
		res.json({
				mesaage : constant.VERIFICATION_FAILED_MSG
		})
	})
}
