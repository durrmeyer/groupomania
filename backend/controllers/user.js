const bcrypt = require("bcrypt"); // Bcrypt permet de crypter le password et de le comparer
const jwt = require("jsonwebtoken"); // Jwt necessaire pour la création d'un token
const db = require('../models');// Récupération des modèles Sequelize
const authUser = require("../middleware/authUser");

require("dotenv").config();

exports.register = (req, res) => {
	try {
		// vérifie  si le mot de passe fait plus de 8 caractères
		if (req.body.password.length > 8) {
			// Vérifie si l'utilisateur existe déjà
			db.User.findOne({ where: { email: req.body.email } })
				.then((user) => {
					if (!user) {
						//  sécurise le mot de passe en le hachant
						bcrypt
							.hash(req.body.password, 10)
							.then((hash) => {
								// crée une instance du model User, y insert les données et les sauvegardes dans la base de données.
								db.User.create({
									firstName: req.body.firstName,
									lastName: req.body.lastName,
									email: req.body.email,
									password: hash,

									admin: false,
								})

									.then(() => {

										// message retourné en cas de réussite
										res.status(201).json({

											message: 'Utilisateur créé !'
										});
									})
									.catch((error) => {
										// message d'erreur retourné en cas d'échec de l'ajout des données dans la BDD
										res.status(500).json({ error });
									});
							})
							// message d'erreur en cas d'échec de hachage du mot de passe
							.catch((error) => res.status(500).json({ error }));
					} else {
						// message d'erreur si l'utilisateur à été trouvé dans la BDD
						return res.status(401).json({ message: ' déjà inscrit!' });
					}
				})

		}
	}
	// message d'erreur si la présence de l'utilisateur dans la BDD n'a pu être vérifié
	catch (error) {
		res.status(500).json({ error: 'aïe erreur' });
	}

};

exports.login = async (req, res) => {

	db.User.findOne({
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
					user: user,
					isAdmin: false,
					token: jwt.sign(
						{

							userId: user.id

						},
						"RANDOM_TOKEN_SECRET",
						{ expiresIn: '24h' }
					),
					message: "Bonjour " + user.firstName + " ! ",
				});
			})
			.catch((error) => res.status(500).json({ error }));
	});

}

exports.getUserById = (req, res) => {

	db.User.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((user) => res.status(200).send(user))
		.catch((err) => res.status(500).send({
			err,
			message: 'Erreur serveur'

		}));


};

exports.getAllUsers = (req, res,) => {

	db.User.findAll({
		attributes: [
			"id",
			"firstName",
			"lastName",
			"email",
			"image",
			"createdAt"
		],

	})
		.then((users) => res.status(200).send(users))
		.catch((error) => res.status(500).send({ error }));

};

exports.updateUser = async (req, res) => {

	let newImage;
	let user = await db.User.findOne({ where: { id: req.params.id } });

	if (req.image) {
		newImage = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
	}
	if (newImage && user.image) {
		const filename = user.image.split("/images/")[1];
		fs.unlink(`images/${filename}`, (error) => {
			if (error) console.log(error);
			else {
				console.log(`supprimer: images/${filename}`);
			}
		});
	}
	console.warn('update', req.params, req.body)
	db.User.findOne({
		where: {
			id: req.params.id,
		}
	})
		.then(() => {
			db.User.update({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				image: req.body.image,
			},
				{
					where: { id: req.params.id }
				})
				.then(() => res.status(200).json({
					message: 'User modifié !', user: {
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						email: req.body.email,
						image: req.body.image,
					}
				}))

				.catch(error => res.status(400).json({
					error
				}))
		})
};

exports.deleteUser = (req, res) => {
	//récupération dans la base de donnée

	//l'id du user doit être le même que le paramètre de requête
	db.User.findOne({ where: { id: req.params.id } })

		//supprime l'ancienne image du server  
		.then(user => {
			if (user.id !== authUser.authUser(req)) {
				return res.status(401).json({
					error
				})
			}
			if (req.file) {
				const filename = user.image.split('/images/')[1];
				fs.unlink(`images/${filename}`, () => {
					db.User.destroy({
						where: {
							id: req.params.id
						}
					})
						.then(() => res.status(200).json({
							message: 'le user est bien supprimé !'
						}))
						.catch(error => res.status(400).json({
							error
						}))
				})
			} else {
				db.User.destroy({
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