let Post = require('../model/posts');
let express = require('express');
let jwt = require('jsonwebtoken');
let uuid = require('uuid');
let tokenHelper = require('../helper/tokenHelper');
let constant = require('../utils/constant');


//create new hack
module.exports.createPost = (req, res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Post.create({
			post_id : uuid.v1(),
			post_body : req.body.post_body,
			category : req.body.category,
			image : req.body.image,
			status : constant.PENDING,
			post_title:req.body.post_title,
			created_at : Date.now(),
			updated_at : Date.now(),
			contributor_id:req.body.contributor_id,
			internal_url : req.body.internal_url,
			external_url : req.body.external_url,
			video : req.body.video,
			language : req.body.language
		}).then((post, err)=>{
			if (err) {
				res.json({status:false,
	        		mesaage:"error occured"})
				return
			}
			res.json({
				status:true,
	        	mesaage:constant.USER_REGISTERED,
	        	data:post
			})
		})
	},(reject)=>{
		res.json({
			status:false,
	        mesaage:constant.VERIFICATION_FAILED_MSG
		})
	})
}


//update hack
module.exports.updatePost = (req, res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Post.updateOne({post_id:req.body.post_id},req.body,
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
	        				mesaage : constant.HACK_UPDATED
	        			})
	        		})
	},(reject)=>{
		res.json({
			status:false,
			message:constant.VERIFICATION_FAILED_MSG
		})
	})
}


//get all hacks
module.exports.getAllPosts = (req,res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Post.find({language : req.body.language},(err, docs) =>{
	        if (docs.length){
	            res.json({status:true,
	            	message:"posts found",
	            	data:docs})
	        }else{
	            res.json({status:false,
	            	message:constant.HACK_NOT_FOUND})
	        }
    	});
	},(reject)=>{
		res.json({status:false,
			message:constant.VERIFICATION_FAILED_MSG
		})
	})
}


//get hacks by user
module.exports.getPostsByUser = (req, res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Post.find({language : req.body.language,
					contributor_id : req.body.contributor_id},(err, docs) =>{
	        if (docs.length){
	           res.json({status:true,
	            	message:"posts found",
	            	data:docs})
	        }else{
	            res.json({status:false,
	            	message:constant.HACK_NOT_FOUND})
	        }
    	});
	},(reject)=>{
		res.json({status:false,
			message:constant.VERIFICATION_FAILED_MSG
		})
	})
}


//delete hack
module.exports.deletePost = (req, res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Post.find({post_id : req.body.post_id}, (err, docs) =>{
	        if (docs.length){
	            Post.deleteOne({post_id: req.body.post_id }, (err2)=> {
			if (err2) {
			   	res.json({status:true,message:"error occured"});
			    return;
			    }
			res.json({status:true,message:constant.HACK_DELETED});
		});
	        }else{
	        	res.json({status:true,message:constant.HACK_NOT_FOUND});
	        }
    	});
	},(reject)=>{
		res.json({
			message:constant.VERIFICATION_FAILED_MSG
		})
	})
}
