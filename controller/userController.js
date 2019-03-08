let User = require('../model/user');
let express = require('express');
let jwt = require('jsonwebtoken');
let uuid = require('uuid');
let tokenHelper = require('../helper/tokenHelper')


//create new user token
module.exports.newUserCreation = (req, res)=>{
	tokenHelper.signNewToken().then((resolve)=>{
		User.create({user_id: resolve})
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
module.exports.registerUser = (req, res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		User.find({user_gid : req.body.user_gid}, (err, docs)=> {
	        if (docs.length){
	            res.send('Logged in successfully')
	        }else{
	        	User.create(req.body).then((user, err2)=> {
					if (err2){
						res.send(err2)
						return;
					}
					res.send(user)
				});
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


module.exports.deleteUser = (req, res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		User.deleteOne({user_gid: req.body.user_gid }, (err)=> {
			if (err) {
			    res.send(err);
			    return;
			    }
			res.send("User deleted");
		});
	},(reject)=>{
		res.json({
				mesaage : "verification failed"
		})
	})
}
