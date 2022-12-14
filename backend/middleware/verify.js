const passwordValidator = require("password-validator");
exports.valid = (req, res, next) => {
  // on vérifie le password 
  /*** Créer le schéma pour garantir plus de sécurité aux mots de passes des utilisateurs ***/
const schema = new passwordValidator();
schema
    .is().min(8) /*** minimum 8 caractères ***/
    .is().max(20) /*** maximum 20 caractères ***/
    .has().uppercase() /*** mot de passe doit contenir des lettres majuscules ***/
    .has().lowercase() /*** mot de passe doit contenir des lettres miniscules  ***/
    .has().digits(1) /*** mot de passe doit contenir deux chiffres minimun ***/
    .has().not().spaces() /*** mot de passe ne doit pas avoir d'espace ***/
    .is().not().oneOf(['Passw0rd', 'Password123']); /*** Ces valeurs sont dans la liste noire ***/

  
 if (!schema.validate(req.body.password)) {
    return res.status(400).send({
      error:
        " Votre mot de passe doit contenir au minimum 8 lettres avec des minuscules et majuscules et 2 chiffres min ",
    });
  } else if (schema.validate(req.body.password)) {
    next();
  }
};
