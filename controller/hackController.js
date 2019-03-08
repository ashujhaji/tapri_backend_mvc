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
			video : req.body.video
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
