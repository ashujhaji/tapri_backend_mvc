let User = require('../model/user');
let express = require('express');
let jwt = require('jsonwebtoken');
let tokenHelper = require('../helper/tokenHelper')
let uuid = require('uuid');
let constant = require('../utils/constant');


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
	User.find({user_gid : req.body.user_gid}, (err, docs)=> {
	    if (docs.length){
	        res.json(docs)
	    }else{
	       	User.create({user_gid:req.body.user_gid})
	       		.then((user,err2)=>{
	       			if (err2) {return}
	       			tokenHelper.signNewToken(req.body.user_gid).then((resolve)=>{
	       				User.updateOne({user_gid:req.body.user_gid},
	       					{token:resolve},
	       					(err3,affected,resp)=>{
	       						if (err3) {return}
	        						res.json({
	        							mesaage:constant.USER_REGISTERED})
	        					})
	        			},(reject)=>{
	     					res.json({
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
	            res.send(docs)
	        }else{
	            res.send(constant.USER_NOT_EXIST)
	        }
    	});
	},(reject)=>{
		res.json({mesaage : constant.VERIFICATION_FAILED_MSG})
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
					res.send(err)
					return
				}
			res.json(constant.USER_DETAILS_UPDATED)
		})
	},(reject)=>{
		res.json({
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
