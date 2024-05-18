const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        const statusCode = error.statusCode && Number.isInteger(error.statusCode) && error.statusCode >= 100 && error.statusCode < 600
            ? error.statusCode
            : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

module.exports = asyncHandler;
