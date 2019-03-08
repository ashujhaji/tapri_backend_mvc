let Hack = require('../model/hacks');
let express = require('express');
let jwt = require('jsonwebtoken');
let uuid = require('uuid');
let tokenHelper = require('../helper/tokenHelper');


//create new hack
module.exports.createHack = (req, res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Hack.create({
			hack_id : uuid.v1(),
			body : req.body.hack_body,
			category : req.body.category,
			image : req.body.image,
			status : "pending",
			created_at : Date.now(),
			updated_at : Date.now(),
			internal_url : req.body.internal_url,
			external_url : req.body.external_url,
			video : req.body.video,
			language : req.body.language
		}).then((hack, err)=>{
			if (err) {
				res.json(err)
				return
			}
			res.json(hack)
		})
	},(reject)=>{
		res.json({
			message : "verification failed"
		})
	})
}


//update hack
module.exports.updateHack = (req, res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Hack.updateOne({hack_id:req.body.hack_id},req.body,
	        		(err2, affected, resp)=>{
	        			if (err2) {
	        				res.json({
	        					mesaage: "failed"
	        				})
	        				return
	        			}
	        			res.json({
	        				mesaage : "Hack updated"
	        			})
	        		})
	},(reject)=>{
		res.json({
			message:"verification failed"
		})
	})
}


//get all hacks
module.exports.getAllHacks = (req,res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Hack.find({language : req.body.language},(err, docs) =>{
	        if (docs.length){
	            res.send(docs)
	        }else{
	            res.send('Hack not found')
	        }
    	});
	},(reject)=>{
		res.json({
			message:"verification failed"
		})
	})
}


//get hacks by category
module.exports.getHacksByCategory = (req, res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Hack.find({language : req.body.language,
					category : req.body.category},(err, docs) =>{
	        if (docs.length){
	            res.send(docs)
	        }else{
	            res.send('Hack not found')
	        }
    	});
	},(reject)=>{
		res.json({
			message:"verification failed"
		})
	})
}


//delete hack
module.exports.deleteHack = (req, res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Hack.find({hack_id : req.body.hack_id}, (err, docs) =>{
	        if (docs.length){
	            Hack.deleteOne({hack_id: req.body.hack_id }, (err2)=> {
			if (err2) {
			    res.send(err2);
			    return;
			    }
			res.send("Hack deleted");
		});
	        }else{
	            res.send('Hack not found')
	        }
    	});
	},(reject)=>{
		res.json({
			message:"verification failed"
		})
	})
}
