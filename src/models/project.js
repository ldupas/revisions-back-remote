const connection = require("../db-config");

// Ici on déstructure l'envoi du req.body classique (texte, bool, etc) et le document qui sera uploadé (picture ici)
const insertProject = async ({ name, description, repo_front, repo_back, deploy_url, category_id }, picture) => {
    return connection.promise().query('INSERT INTO project (name, description, picture, repo_front, repo_back, deploy_url, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, description, picture, repo_front, repo_back, deploy_url, category_id])
};


module.exports = {
    insertProject
};