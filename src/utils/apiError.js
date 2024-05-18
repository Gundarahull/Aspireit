class ApiError extends Error{
    constructor(
        statusCode,
        message="Something Went Wrong",
        errors=[],
        stack=''
    ){
        //overriding our errors with perfect error codes and messages from the Error inbulit class
        super(message);
        this.statusCode=statusCode;
        this.errors=errors;
        this.data=null,
        this.message=message;
        this.success=false

    }
}

module.exports=ApiError;