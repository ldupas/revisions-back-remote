const connection = require("../db-config");
const router = require("express").Router();
const Joi = require("joi");
const argon2 = require("argon2");

const { findUserByEmail, insertUser } = require("../models/user");
const checkJwt = require("../middlewares/checkJwt");
const { generateJwt } = require("../utils/auth");

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

router.get("/", (req, res) => {
    connection.query("SELECT * FROM user", (err, result) => {
        if(err) {
            return res.status(500).send("Error retrieving users from database");
        } else {
            return res.status(200).json(result);
        }
    });
});

router.get("/:id", (req, res) => {
    const userId = req.params.id;
    connection.query("SELECT * FROM user WHERE id=?",
    [userId],
    (err, results) => {
        if(err) {
            return res.status(500).send("Error retrieving users from database");
        } else {
            if (results.length) res.json(results[0]);
            else res.status(404).send("User not found");
        }
    })
});

router.post("/", async (req, res) => {
    const { value, error } = userSchema.validate(req.body);

    if(error) {
        return res.status(400).json(error)
    };

    const [[existingUser]] = await findUserByEmail(value.email);

    if(existingUser) {
        return res.status(409).json({
            message: "L'utilisateur est deja existant en BDD"
        });
    };

    const hashedPassword = await argon2.hash(value.password);
    await insertUser(value.email, hashedPassword);

    // const jwtKey = generateJwt(value.email);
    // return  res.json({
    //     credentials: jwtKey
    // })

    return res.status(201).json({
        message: "L'utilisateur a bien ete cree"
    })
});

router.post("/login", async (req, res) => {
    const { value, error } = userSchema.validate(req.body);

    if(error) {
        return res.status(400).json(error)
    };

    const [[existingUser]] = await findUserByEmail(value.email);

    if(!existingUser) {
        res.status(403).json({
            message: "L'utilisateur n'existe pas"
        });
    };

    const verified = await argon2.verify(existingUser.password, value.password);
    if(!verified) {
        return res.status(403).json({
            message: "Le mot ne correspond a celui de l'utilisateur renseigne"
        });
    };

    const jwtKey = generateJwt(value.email);
    return  res.json({
        credentials: jwtKey
    })
});


module.exports = router;