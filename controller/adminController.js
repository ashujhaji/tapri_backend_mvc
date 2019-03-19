let Admin = require('../model/admin');
let express = require('express');
let jwt = require('jsonwebtoken');
let uuid = require('uuid');
let tokenHelper = require('../helper/tokenHelper');
let constant = require('../utils/constant');

module.exports.registerAsAdmin = (req, res)=>{
		Admin.find({center_code : req.body.center_code}, (err, docs)=> {
	        if (docs.length){
	            res.send('Already registered, Kindly login')
	        }else{
	        	if (req.body.center_code!=null&&req.body.password!=null) {
	        	Admin.create(req.body)
					.then((admin, err)=>{
						tokenHelper.signNewTokenForAdmin(req.body.center_code).then((resolve)=>{
							Admin.updateOne({center_code:req.body.center_code},
								{token:resolve},
								(err2,affected,resp)=>{
									if (err2) {return}
										res.json({mesaage:"Successfully registered, Kindly login"})
								})
						},(reject)=>{
							res.json({
	        					mesaage:constant.TOKEN_GENERATION_FAILED
	     					})
						})
					})
	        	}else{
	        		res.json({mesaage: "Insufficient data"})
	        	}
	        }
	    })
}


module.exports.login = (req,res)=>{
		Admin.find({
			$and : [
        		{center_code:req.body.center_code},
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
}



module.exports.updateDetails = (req, res)=>{
	tokenHelper.signNewTokenForAdmin(req.body.center_code).then((resolve)=>{
		Admin.updateOne({center_code:req.body.center_code},
			req.body,
			(err,affected,resp)=>{
			if (err) {
				res.json("updation failed")
				return
			}
			res.json(affected)
		})
	},(reject)=>{
		res.json({
			mesaage:constant.TOKEN_GENERATION_FAILED
	    	})
	    })
}

module.exports.getAdmin = (req,res)=>{
		Admin.find({
			$and : [
        		{center_code:req.body.center_code},
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
}



module.exports.addStudentDetail = (req,res)=>{
	tokenHelper.signNewTokenForAdmin(req.body.center_code).then((resolve)=>{
		Admin.updateOne({center_code:req.body.center_code},
			{$push: { student_details: req.body }},
			(err,affected,resp)=>{
			if (err) {
				res.json("updation failed")
				return
			}
			res.json(affected)
		})
	},(reject)=>{
		res.json({
			mesaage:constant.TOKEN_GENERATION_FAILED
	    	})
	    })
}


