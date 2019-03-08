let Admin = require('../model/admin');
let express = require('express');
let jwt = require('jsonwebtoken');
let uuid = require('uuid');
let tokenHelper = require('../helper/tokenHelper');

module.exports.registerAsAdmin = (req, res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Admin.find({user_gid : req.body.user_gid}, (err, docs)=> {
	        if (docs.length){
	            res.send('Already registered')
	        }else{
	        	Admin.create(req.body)
					.then((user, err)=>{
						res.json(user)
					})
	        }
	    })
	},(reject)=>{
		res.json({
				mesaage:"signing in failed",
				status : false
		})
	})
}

module.exports.getAdmin = (req,res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Admin.find((err, docs)=> {
	        res.json(docs)
	    })
	},(reject)=>{
		res.json({
				mesaage:"signing in failed",
				status : false
		})
	})
}


