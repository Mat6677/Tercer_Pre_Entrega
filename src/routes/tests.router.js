const { Router } = require("express");

const testRouter = Router()

testRouter.get("/", (req,res) => {
    req.logger.fatal('this is an unhandled fatal error');
    req.logger.error('this is an unhandled error');
    req.logger.warning('this is a warning');
    req.logger.http('This is a http log');
    req.logger.info('this is a info log');
    req.logger.debug('this is a debug log');

    res.send({status:'success', message:'Logger test'})
})

module.exports = testRouter;