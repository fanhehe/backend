module.exports = function (sequelize, DataTypes) {
	const Article = sequelize.define('tbl_article', {
		id: {
			type: DataTypes.INTEGER(11),
			autoIncrement: true,
			primaryKey: true,
		},
		author: {
			type : DataTypes.STRING(40),
			field: 'author',
			references: {
				model: 'TUser',
				key: 'username',
			},
		},
		title: {
			type: DataTypes.STRING(40),
		},
		content: {
			type: DataTypes.TEXT,
		},
		createTime: {
			type: DataTypes.DATE,
			field: 'create_time',
		},
		lastModifyTime: {
			type: DataTypes.DATE,
			field: 'last_modify_time',
		},
		status: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: 1,
		},
	}, {
		timestamps: false,
		// createAt: 'create_time',
		// UpdateAt: 'last_modify_time',
		tableName: 'tbl_article',
		freezeTableName: true,
		classMethods: {
			associate: function(models) {
				Article.belongsTo( models.TUser, { as: "User", foreignKey: 'author', targetKey: 'username' });
			}
		}
	});
	return Article
};
