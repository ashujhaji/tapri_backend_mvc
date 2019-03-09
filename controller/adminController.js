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
	        	Admin.create(req.body)
					.then((admin, err)=>{
						res.json(admin)
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


module.exports.login = (req,res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Admin.find({
			$and : [
        {institution_id:req.body.institution_id},
        {password:req.body.password}
    				]},(err, docs)=> {
			if (err) {
				res.json({
					mesaage: "login failed"
				})
				return
			}
			res.json(docs)
	    })
	},(reject)=>{
		res.json({
				mesaage:"verification failed",
				status : false
		})
	})
}



module.exports.updateDetails = (req, res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Admin.updateOne({institution_id:req.body.institution_id},req.body,(err,affected,resp)=>{
			if (err) {
				res.json("updation failed")
				return
			}
			res.json(affected)
		})
	})
}


module.exports.getAdmin = (req,res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Admin.find({
			$and : [
        		{institution_id:req.body.institution_id},
        		{password:req.body.password}
    				]},(err, docs)=> {
			if (err) {
				res.json({
					mesaage: "User not found"
				})
				return
			}
			res.json(docs)
	    })
	},(reject)=>{
		res.json({
				mesaage:"signing in failed",
				status : false
		})
	})
}


