module.exports = function (sequelize, DataTypes) {
	return sequelize.define('tbl_article_comments', {
		id: {
			type: DataTypes.INTEGER(11),
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING(40),
		},
		replyTo: {
			type: DataTypes.STRING(40),
			field: 'reply_to',
		},
		articleId: {
			type: DataTypes.INTEGER(11),
			field: 'article_id',
		},
		parentId: {
			type: DataTypes.INTEGER(11),
			field: 'parent_id',
		},
		content: {
			type: DataTypes.TEXT,
		},
		createTime: {
			type: DataTypes.DATE,
			field: 'create_time',
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
		tableName: 'tbl_article_comments',
		freezeTableName: true
	});
};
