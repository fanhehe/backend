module.exports = function (sequelize, DataTypes) {
	const TUser = sequelize.define('tbl_user', {
		id: {
			type: DataTypes.INTEGER(11),
			autoIncrement: true,
		},
		username: {
			type : DataTypes.STRING(40),
			primaryKey: true,
		},
		password: {
			type : DataTypes.STRING(40),
		},
		real_name: {
			type : DataTypes.STRING(40),
		},
		preview: {
			type : DataTypes.STRING(100),
		},
		nickname: {
			type : DataTypes.STRING(40),
		},
		create_time: {
			type: DataTypes.DATE,
		},
		qq:{
			type: DataTypes.STRING(20),
		},
		status:{
			type : DataTypes.INTEGER(1),
			defaultValue:0
		},
		gender:{
			type : DataTypes.ENUM('male', 'female'),
		},
		telephone:{
			type:DataTypes.CHAR(20)
		},
		email:{
			type:DataTypes.STRING(40)
		},
		ip:{
			type:DataTypes.STRING(20)
		},
	}, {
		timestamps: false,
		tableName: 'tbl_user',
		freezeTableName: true,
		classMethods: {
			associate: function(models) {
				TUser.hasMany( models.TArticle, { as: "Article", foreignKey: 'author', targetKey: 'username' });
			}
		}
	});
	return TUser;
};
