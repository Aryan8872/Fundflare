const response = {
    success: (message, data = null, statusCode = 200) => ({
        success: true,
        message,
        data,
        statusCode,
    }),

    error: (message, statusCode = 400) => ({
        success: false,
        message,
        statusCode,
    }),

    notFound: (message = "Resource not found") => ({
        success: false,
        message,
        statusCode: 404,
    }),
};

export default response; 