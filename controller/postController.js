let Post = require('../model/posts');
let express = require('express');
let jwt = require('jsonwebtoken');
let uuid = require('uuid');
let tokenHelper = require('../helper/tokenHelper');
let constant = require('../utils/constant');
let job = require('../controller/jobController');


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
			contributor_name : req.body.contributor_name,
			contributor_institute:req.body.contributor_institute,
			internal_url : req.body.internal_url,
			external_url : req.body.external_url,
			video : req.body.video,
			language : req.body.language,
			is_job_post:req.body.is_job_post
		}).then((post, err)=>{
			if (err) {
				res.json({status:false,
	        		mesaage:"error occured"})
				return
			}
			if(!post.is_job_post){
				res.json({
				status:true,
	        	mesaage:"post created",
	        	data:post})
			}else{
				job.createNewJob(post).then((resolve)=>{
					res.json({
						status:true,
			        	mesaage:"Job created",
			        	data:post})
				},(reject)=>{
					res.json({status:false,
	        		mesaage:"error occured"})
				})
			}
			
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
		Post.find({},(err, docs) =>{
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
		Post.find({contributor_id : req.body.contributor_id},(err, docs) =>{
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
			status:false,
			message:constant.VERIFICATION_FAILED_MSG
		})
	})
}



//comment on post
module.exports.addCommentOnPost = (req,res)=>{
	var comment = {comment_id:uuid.v1(), comment_body:req.body.comment_body,commented_at:Date.now(),commented_by:req.body.user_gid, image:req.body.image}
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Post.updateOne({post_id:req.body.post_id},{$push: {comments: comment}},
	        		(err2, affected, resp)=>{
	        			if (err2) {
	        				res.json({
	        					status:false,
	        					mesaage: "error occured while commenting"
	        				})
	        				return
	        			}
	        			res.json({
	        				status:true,
	        				mesaage : "Comment saved"
	        			})
	        		})
	},(reject)=>{
		res.json({
			status:false,
			message:constant.VERIFICATION_FAILED_MSG
		})
	})
}


//delete comment from post
module.exports.deleteCommentFromPost = (req,res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Post.findOneAndUpdate({post_id: req.body.post_id}, {$pull: {comment_id: req.body.comment_id}},
		    function(err,doc) {
		    	if (!err) {res.json(doc)}
		    		else return
		    });
	},(reject)=>{
		res.json({
			mesaage:constant.TOKEN_GENERATION_FAILED
	   	})
	})
}
