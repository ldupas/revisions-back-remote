// Je commence mon fichier principal en configurant mes outils (libraries, etc)

require("dotenv").config();
const connection = require("./db-config");
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/index.routes");

const port = process.env.PORT || 8000;

// Ensuite, je vais utiliser ces meme outils pour mon appli
// Ici je permets a mon application d'interragir avec le format de donnees JSON
app.use(express.json());

// Ici, j'ouvre la possibilite d'utiliser un second format de data (postman etc)
app.use(express.urlencoded({extended: true}));

// Ici, j'ouvre les vannes d'utilisation de mon API (cors = cross origin)
app.use(cors());

app.use("/api", router);

// Ici je prepare un msg d'accueil sur a route principale a savoir localhost:8000
app.get("/", (req, res) => {
    res.send("Welcome!");
});

// Ici (a ne pas connaitre par coeur), je prepare l'instance de connexion ainsi que le port d'ecoute du serveur
connection.connect((err) => {
    if(err) {
        console.error('error connectiog :' + err.stack);
    } else {
        console.log("connected as id" + connection.threadId);
    }
});

app.listen(port, () => {
    console.log(`Server is listenning on port ${port}`);
})

module.exports = app;