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
		Admin.updateOne({institution_id:req.body.institution_id},
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
			mesaage:"verification failed"
		})
	})
}

module.exports.addAvailableCourse = (req,res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		var courseData = { cid: uuid.v1(), c_name: req.body.course_name};
		Admin.updateOne({institution_id:req.body.institution_id},
			{$push: { courses: courseData }},
				(err,affected,resp)=>{
					if (err) {
						res.json({
							mesaage: "updation failed"
						})
						return
					}
					res.json(affected)
				})
	},(reject)=>{
		res.json({
			mesaage : "verification failed"
		})
	})
}


module.exports.deleteCourse = (req,res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		var courseData = { cid:req.body.cid};
		Admin.updateOne({institution_id:req.body.institution_id},
			{$pull: { courses: courseData }},
				(err,affected,resp)=>{
					if (err) {
						res.json({
							mesaage: "updation failed"
						})
						return
					}
					res.json(affected)
				})
	},(reject)=>{
		res.json({
			mesaage : "verification failed"
		})
	})
}


module.exports.addAvailableBranch = (req,res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Admin.find({institution_id:req.body.institution_id},(err, docs)=>{
			docs.find({cid : req.body.cid},(err2,docs2)=>{
				res.json(docs2)
			})
		})
		// var branchData = {bid : uuid.v1(), b_name : req.body.b_name}
		// var courseData = {branch:branchData};
		// Admin.updateOne({institution_id:req.body.institution_id},
		// 	{$push: { courses: courseData }},
		// 		(err,affected,resp)=>{
		// 			if (err) {
		// 				res.json({
		// 					mesaage: "updation failed"
		// 				})
		// 				return
		// 			}
		// 			res.json(affected)
		// 		})
	},(reject)=>{
		res.json({
			mesaage : "verification failed"
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


