const router = require("express").Router();

const skillRouter = require("./skills.routes");

router.use("/skills", skillRouter);

module.exports = router;