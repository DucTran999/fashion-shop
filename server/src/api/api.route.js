import routerV1 from "./v1/router.js";

const apiRouter = (app) => {
  app.use("/api/v1", routerV1);

  app.use("/api", (req, res, next) => {
    res.status(200);
    res.json({
      status: 200,
      message: "available api list",
      links: {
        docs: "https://doc.com/api",
      },
    });
  });
};

export default apiRouter;
