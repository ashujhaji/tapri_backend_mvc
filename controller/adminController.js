let Admin = require('../model/admin');
let express = require('express');
let jwt = require('jsonwebtoken');
let uuid = require('uuid');
let tokenHelper = require('../helper/tokenHelper');

module.exports.registerAsAdmin = (req, res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Admin.find({institution_id : req.body.institution_id}, (err, docs)=> {
	        if (docs.length){
	            res.send('Already registered')
	        }else{
	        	Admin.updateOne({user_id:req.body.user_id},req.body,
	        		(err2, affected, resp)=>{
	        			if (err2) {
	        				res.json({
	        					mesaage: "failed"
	        				})
	        				return
	        			}
	        			res.json({
	        				mesaage : "Admin registered"
	        			})
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


