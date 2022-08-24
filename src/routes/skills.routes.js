const connection = require("../db-config");
const router = require("express").Router();
const checkJwt = require("../middlewares/checkJwt");

// Par defaut, lors de la creation du back-end, la seconde etape serait de gerer votre routing (post config)
// Idealement, vous allez creer vos 5 routes de bases qui font reference aux verbes d'action HTTP (CRUD)

router.get("/", checkJwt, (req, res) => {
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

router.post('/', (req, res) => {
    const { name, picture } = req.body;
    connection.query(
    'INSERT INTO skill (name, picture) VALUES (?, ?)',
    [name, picture],
    (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving skills from database');
        }
        else 
        {
            const id = result.insertId;
            const createdSkill = { id, name, picture };
            res.status(201).json(createdSkill);
        }
    }
)
});

router.put('/:id', (req, res) => {
    connection.query(
      'UPDATE skill SET ? WHERE id = ?',
      [req.body, req.params.id],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error updating a skill');
        } else {
          if (result.affectedRows) {
            const updatedSkill = {
              id: req.params.id,
              name: req.body.name
            };
            return res.status(200).json(updatedSkill);
          } else return res.status(404).send('Skill not found.');
        }
      }
    );
  });

router.delete('/:id', (req, res) => {
    const skillId = req.params.id;
    connection.query(
        'DELETE FROM skill WHERE id = ?',
        [skillId],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error while deleting a skill');
            }
            else
            {
                if(result.affectedRows) res.status(200).send('🎉 Skill deleted')
                else res.status(404).send('Skill not found!')
            }
        }
    )
});

module.exports = router;