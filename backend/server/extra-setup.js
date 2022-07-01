/*function applyExtraSetup(sequelize) {
	const { Post, User } = sequelize.models;

	User.hasMany(Post);
	Post.belongsTo(User);
}*/

module.exports = { applyExtraSetup };