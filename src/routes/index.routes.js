const router = require("express").Router();
const userRouter = require("./users.routes");
const projectRouter = require("./projects.routes");
const skillRouter = require("./skills.routes");
const categoryRouter = require("./categories.routes");

router.use("/users", userRouter);
router.use("/projects", projectRouter);
router.use('/categories', categoryRouter);
router.use("/skills", skillRouter);

module.exports = router;