const errorHandler = (app) => {
  app.use((req, res, next) => {
    next(createHttpError.NotFound());
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      status: "error",
      message: err.message,
    });
  });
};

export default errorHandler;
