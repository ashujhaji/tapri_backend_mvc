let Jobs = require('../model/jobs');
let express = require('express');
let jwt = require('jsonwebtoken');
let uuid = require('uuid');
let tokenHelper = require('../helper/tokenHelper');
let constant = require('../utils/constant');



module.exports.createNewJob = (post)=>{
	return new Promise((resolve, reject)=>{
		Jobs.create({
			post_id : post.post_id,
			post_body : post.post_body,
			post_title:post.post_title,
			category : post.category,
			image : post.image,
			status : "active",			
			created_at : Date.now(),
			updated_at : Date.now(),
			contributor_id:post.contributor_id,
			internal_url : post.internal_url,
			external_url : post.external_url,
			video : post.video,
			language : post.language
		}).then((jobs, err)=>{
			if (err) {
				reject(err);
				return
			}
			resolve(jobs);
		})
	})
}


module.exports.updateJobDetails = (req,res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Jobs.updateOne({post_id:req.body.post_id},req.body,
	        		(err2, affected, resp)=>{
	        			if (err2) {
	        				res.json({
	        					status:false,
	        					mesaage: constant.UPDATION_FAILED
	        				})
	        				return
	        			}
	        			res.json({
	        				status:true,
	        				mesaage : "Details updated"
	        			})
	        		})
	},(reject)=>{
		res.json({
			status:false,
			message:constant.VERIFICATION_FAILED_MSG
		})
	})
}