let jwt = require('jsonwebtoken');


module.exports.signNewToken = (uid)=>{
	return new Promise((resolve, reject)=>{
		jwt.sign(uid,'secretkey',(error, token)=>{
				if (error) {
					reject(error)
				}else
				resolve(token)
		})
	})
}


module.exports.verifyToken  = (token)=>{
	return new Promise((resolve, reject)=>{
		jwt.verify(token, "secretkey", (err, decoded)=>{
			if (err) {
				reject(err);
			}
			resolve();
		})
	})
}

