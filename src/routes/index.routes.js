const router = require("express").Router();
const userRouter = require("./users.routes");
const skillRouter = require("./skills.routes");

router.use("/users", userRouter);
router.use("/skills", skillRouter);

module.exports = router;