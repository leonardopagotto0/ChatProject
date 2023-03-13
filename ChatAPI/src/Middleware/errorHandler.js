async function errorHandler(err, req, res, next)
{
    let stack;
    
    if(process.env.NODE_ENV == 'dev'){ 
        console.log(err);
        stack = err?.stack;
        if(err?.body) err.body.stack = stack
    }
    if(err?.body) return res.status(err.body.httpStatusCode).json(err.body);
    
    res.status(500).json({
        httpStatusCode: 500,
        response: 'UNKNOWN_ERROR',
        stack
    });
}

export default errorHandler;