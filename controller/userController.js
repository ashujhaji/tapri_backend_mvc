let User = require('../model/user');
let express = require('express');
let jwt = require('jsonwebtoken');
let tokenHelper = require('../helper/tokenHelper')
let uuid = require('uuid');


//create new user token
/*
request body params are :->
Nothing to send
---------------------------------------------
response params are :->
1)user_id
2)token
*/
module.exports.newUserCreation = (req, res)=>{
	const uid = uuid.v1();
	tokenHelper.signNewToken(uid).then((resolve)=>{
		User.create({user_id: uid,
					token : resolve})
		.then((user, err)=>{
			res.json(user)
		})
	},(reject)=>{
		res.json({
			mesaage : "sign in failed"
		})
	})
}


//register user with google id
/*
request body params are :->
1)user_id (mandatory)
2)token (mandatory)
3)user_gid (mandatory)
4)user_name
5)user_dp
6)user_email
---------------------------------------------
response params are :->
logged in / signed up message
*/
module.exports.registerUser = (req, res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		User.find({user_gid : req.body.user_gid}, (err, docs)=> {
	        if (docs.length){
	            res.send('Logged in successfully')
	        }else{
	        	User.updateOne({user_id:req.body.user_id},req.body,
	        		(err2, affected, resp)=>{
	        			if (err2) {
	        				res.json({
	        					mesaage: "failed"
	        				})
	        				return
	        			}
	        			res.json({
	        				mesaage : "User registered"
	        			})
	        		})
	        }
    	});
	},(reject)=>{
		res.json({
				mesaage:"signing in failed",
				status : false
		})
	})
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
	            res.send('User not exist')
	        }
    	});
	},(reject)=>{
		res.json({
				mesaage : "verification failed"
		})
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
			res.json("User details updated")
		})
	},(reject)=>{
		res.json({
				mesaage : "verification failed"
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
			res.send("User deleted");
		});
	        }else{
	            res.send('User not exist')
	        }
    	});
	},(reject)=>{
		res.json({
				mesaage : "verification failed"
		})
	})
}
