const connection = require("../db-config");
const router = require("express").Router();
const multer = require("multer");
const { insertProject } = require("../models/project");

const upload = multer({ dest: "uploads/projects/"});

router.get("/", (req, res) => {
    connection.query("SELECT * FROM project", (err, result) => {
        if(err) {
            return res.status(500).send("Error retrieving projects from database");
        } else {
            return res.json(result);
        }
    });
});

router.post("/", upload.single("picture"), async (req, res) => {
    const [{ insertId: id}] = await insertProject(req.body, req.file.path);
    console.log(req);

    return res.json({
        ...req.body,
        id,
        picture: req.file.filename
    })
});


module.exports = router;