const authUser = require("./authUser");


module.exports = (req, res, next) => {
	const token = req.headers.authorization;
	const userId = req.body.userId;
	console.log(token, "c'est celui-ci")

	try {
		if (!token) throw new Error("Problème authentification");


		if (userId && userId !== authUser(req))
			throw 'Invalid user ';

		next();

	} catch (error) {
		res.status(401).json({
			error
		});
	}
}