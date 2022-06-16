
const bcrypt = require("bcrypt"); // Bcrypt permet de crypter le password et de le comparer
const jwt = require("jsonwebtoken"); // Jwt necessaire pour la création d'un token
const db = require('../server/models');// Récupération des modèles Sequelize

const User = db.User;
require("dotenv").config();

exports.register = (req, res) => {
	try {
		// vérifie  si le mot de passe fait plus de 8 caractères
		if (req.body.password.length > 8) {
			// Vérifie si l'utilisateur existe déjà
			User.findOne({ where: { email: req.body.email } })
				.then((user) => {
					if (!user) {
						//  sécurise le mot de passe en le hachant
						bcrypt
							.hash(req.body.password, 10)
							.then((hash) => {
								// crée une instance du model User, y insert les données et les sauvegardes dans la base de données.
								const user = new User({
									id: req.body.id,
									firstName: req.body.firstName,
									lastName: req.body.lastName,
									email: req.body.email,
									password: hash,
									idRole: 1
								});
								user
									.save()
									.then(() => {
										// message retourné en cas de réussite
										res.status(201).json({ message: 'Utilisateur créé !' });
									})
									.catch((error) => {
										// message d'erreur retourné en cas d'échec de l'ajout des données dans la BDD
										res.status(500).json({ error });
									});
							})
							// message d'erreur en cas d'échec de hachage du mot de passe
							.catch((error) => res.status(500).json({ error: 'toto' }));
					} else {
						// message d'erreur si l'utilisateur à été trouvé dans la BDD
						return res.status(401).json({ message: ' déjà inscrit!' });
					}
				})

		}
	}// message d'erreur si la présence de l'utilisateur dans la BDD n'a pu être vérifié
	catch (error) {
		res.status(500).json({ error: 'erreur' });
	}

};

/********************Connection  utilisateur******************* */
exports.login = async (req, res) => {
	try {
		User.findOne({
			where: { email: req.body.email }
		}).then((user) => {
			if (!user) {
				return res.status(401).json({ message: 'aucun compte ne correspond à votre adresse mail !' });
			}

			// bcrypt compare les Hashs
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({ message: 'Mot de passe incorrect !' });
					}

					res.status(200).json({
						userId: user.id,
						idRole: user.idRole,
						token: jwt.sign(
							{
								userId: user.id,
								idRole: user.idRole,
							},
							'KEY_SECRET',
							{ expiresIn: '12h' }
						)
					});
				})
		});

	} catch (error) {
		res.status(400).json({ error: error.message })
	}
};
exports.User = async (req, res) => {
	// on trouve l'utilisateur et on renvoie l'objet user
	try {
		const user = await db.User.findOne({
			where: { id: req.params.id },
		});
		res.status(200).send(user);
	} catch (error) {
		return res.status(500).send({ error: "Erreur serveur" });
	}
};


exports.getAllUsers = async (req, res) => {
	User.findAll()
		.then((users) => res.status(200).json(users))
		.catch((error) => res.status(400).json({ message: error }));

};
exports.getUserById = (req, res) => {
	// On l'identifie par l'ID
	User.findOne({
		where: { id: req.params.id }
	})
		.then((user) => res.status(200).json(user))
		.catch((error) => res.status(404).json({ error, message: 'user non trouvé' }));
};

exports.updateUser = (req, res) => {
	User.findOne({ where: { id: req.params.id } });
	const userObjet = req.file ? {
		...(req.body.user),
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	}
		: {
			...req.body
		}; //fichier n'existe pas

	User.update({
		...userObjet
	}, {
		where: {
			id: req.params.id
		}
	})
		.then(() => res.status(200).json({ message: 'User modifié !' }))
		.catch((error) => res.status(400).json({ message: error }));
};
exports.deleteUser = (req, res) => {
	//récupération dans la base de donnée

	//l'id du post doit être le même que le paramètre de requête
	User.findOne({ where: { id: req.params.id } })

		//supprime l'ancienne image du server  
		.then(user => {

			if (req.file) {
				const filename = user.imageUrl.split('/images/')[1];
				fs.unlink(`images/${filename}`, () => {
					user.destroy({
						where: {
							id: req.params.id
						}
					})
						.then(() => res.status(200).json({
							message: 'le post est bien supprimé !'
						}))
						.catch(error => res.status(400).json({
							error
						}))
				})
			} else {
				user.destroy({
					where: {
						id: req.params.id
					}
				})
					.then(() => res.status(200).json({
						message: 'un utilisateur est bien supprimé !'
					}))
					.catch(error => res.status(400).json({
						error
					}))
			}
		})
		.catch(error => res.status(500).json({
			error,
			message: 'impossible de supprimer l utilisateur !'
		}))
};