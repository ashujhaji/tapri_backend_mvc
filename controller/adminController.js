let Admin = require('../model/admin');
let express = require('express');
let jwt = require('jsonwebtoken');
let uuid = require('uuid');
let tokenHelper = require('../helper/tokenHelper');
let constant = require('../utils/constant');


module.exports.pojoRoute = (req,res)=>{
	res.json({mesaage:"accessed"})
}



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
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
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
					status:false,
					mesaage: "Admin not found"
				})
				return
			}
			res.json({
					status:true,
					mesaage: "Admin found",
					data:docs
				})
	    })
}



module.exports.addStudentDetail = (req,res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Admin.find({
			$and : [
        		{center_code:req.body.center_code},
        		{'student_details.roll_no' : req.body.roll_no}
    				]},(err,docs)=>{
    					if (docs.length==0) {
    						Admin.updateOne({center_code:req.body.center_code},
								{$push: { student_details: req.body }},
								(err,affected,resp)=>{
								if (err) {
									res.json("updation failed")
									return
								}
								res.json(affected)
					})
    					}else{
							res.json("Student with this detail already exist")
							}
    				})
	},(reject)=>{
		res.json({
			mesaage:constant.TOKEN_GENERATION_FAILED
	    	})
	    })
}


module.exports.updateStudentDetails = (req,res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Admin.findOneAndUpdate(
		    { center_code: req.body.center_code, "student_details.roll_no": req.body.roll_no},
		    { 
		        "$set": {
		            "student_details.$": req.body
		        }
		    },
		    function(err,doc) {
		    	if (!err) {res.json(doc)}
		    		else return
		    }
		);
	},(reject)=>{
		res.json({
			mesaage:constant.TOKEN_GENERATION_FAILED
	   	})
	})
}




module.exports.getStudentDetail = (req,res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		Admin.find({
			$and : [
        		{center_code:req.body.center_code},
        		{'student_details.roll_no' : req.body.roll_no}
    				]},(err,docs)=>{
    					if (err) {return}
    						if (docs.length==0) {
    							res.json({mesaage:"Student with this data does not found"})
    						}else{
	    						docs[0].student_details.forEach(function(item) {
	  								if (item.roll_no == req.body.roll_no) {
	  									res.json(item)
	  								}
								});
    						}
    				})
	},(reject)=>{
		res.json({
			mesaage:constant.TOKEN_GENERATION_FAILED
	   	})
	})
}



module.exports.addPlacementRecord = (req,res)=>{
	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
		var placement = {year: req.body.year, company_name: req.body.company_name,total_placed_count:req.body.total_placed_count};
		Admin.findOneAndUpdate({center_code: req.body.center_code}, {$push: {placement_data: placement}},
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


module.exports.getCollegeName = (institute_id)=>{
	return new Promise((resolve, reject)=>{
		Admin.find({center_code:institute_id},(err, docs)=> {
			if (err) {reject(err)}else{
				resolve(docs[0].institution_name)
			}
	    })
	})
}


// module.exports.deletePlacementRecord = (req,res)=>{
// 	tokenHelper.verifyToken(req.body.token).then((resolve)=>{
// 		// var placement = {year: req.body.year, company_name: req.body.company_name,total_placed_count:req.body.total_placed_count};
// 		Admin.findOneAndUpdate({center_code: req.body.center_code}, {$pull: {_id: placement}},
// 		    function(err,doc) {
// 		    	if (!err) {res.json(doc)}
// 		    		else return
// 		    });
// 	},(reject)=>{
// 		res.json({
// 			mesaage:constant.TOKEN_GENERATION_FAILED
// 	   	})
// 	})
// }

