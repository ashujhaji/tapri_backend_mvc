let jwt = require('jsonwebtoken');


module.exports.signNewToken = (user_gid)=>{
	return new Promise((resolve, reject)=>{
		jwt.sign(user_gid,'secretkey',(error, token)=>{
				if (error) {
					reject(error)
				}else
				resolve(token)
		})
	})
}


module.exports.signNewTokenForAdmin = (center_code)=>{
	return new Promise((resolve, reject)=>{
		jwt.sign(center_code,'secretkey',(error, token)=>{
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

