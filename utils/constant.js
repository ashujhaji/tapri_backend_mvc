var Constants = {
	VERIFICATION_FAILED_MSG : "verification failed",
	TOKEN_GENERATION_FAILED : "token generation failed",
	USER_REGISTERED : "user registered",
	USER_NOT_EXIST : "user not exist",
	USER_DETAILS_UPDATED : "user details updated",
	USER_DELETED : "user deleted",
	UPDATION_FAILED : "updation failed",
	HACK_UPDATED : "hack updated",
	HACK_NOT_FOUND : "hack not found",
	HACK_DELETED : "hack deleted",

	//hack schema fields
	HACK_ID : "hack_id",
	HACK_BODY : "hack_body",
	CATEGORY : "category",
	SUBCATEGORY : "subcategory",
	CONTRIBUTOR : "contributor",
	TAG : "tag",
	STATUS : "status",
	COUNTRY : "country",
	CREATED_AT : "created_at",
	UPDATED_AT : "updated_at",
	INTERNAL_URL : "internal_url",
	EXTERNAL_URL : "external_url",
	VIDEO : "video",
	IMAGE : "image",

	//hack status constants
	PENDING : "pending",
	APPROVED : "approved",


	//routes
	ROUTE_USER_REGISTERED : "/register",
	ROUTE_GET_USER_DETAILS : "/get_user_details",
	ROUTE_UPDATE_USER_DETAILS : "/update_user_details",
	ROUTE_DELETE_USER : "/delete_user"
}

module.exports = Constants;