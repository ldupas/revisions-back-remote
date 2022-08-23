const connection = require("../db-config");
const router = require("express").Router();

// Par defaut, lors de la creation du back-end, la seconde etape serait de gerer votre routing (post config)
// Idealement, vous allez creer vos 5 routes de bases qui font reference aux verbes d'action HTTP (CRUD)

router.get("/", (req, res) => {
    connection.query("SELECT * FROM skill", (err, result) => {
        if(err) {
            return res.status(500).send("Error retrieving skills from database");
        } else {
            return res.json(result);
        }
    });
});

router.get("/:id", (req, res) => {
    const skillId = req.params.id;
    connection.query("SELECT * FROM skill WHERE id=?",
    [skillId],
    (err, results) => {
        if(err) {
            return res.status(500).send("Error retrieving skills from database");
        } else {
            if (results.length) res.json(results[0]);
            else res.status(404).send("Skill not found");
        }
    })
});

module.exports = router;