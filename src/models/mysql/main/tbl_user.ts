module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tbl_user', {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type : DataTypes.CHAR(100),
    },
    password: {
      type : DataTypes.CHAR(32),
    },
    real_password: {
      type: DataTypes.STRING(100),
    },
    real_name: {
      type : DataTypes.CHAR(50),
    },
    preview: {
      type : DataTypes.CHAR(100),
    },
    nickname: {
      type : DataTypes.CHAR(100),
    },
    create_time: {
      type: DataTypes.INTEGER(11),
      defaultValue:0
    },
    last_login_time: {
      type : DataTypes.INTEGER(11),
    },
    qq:{
      type: DataTypes.CHAR(20),
    },
    status:{
      type : DataTypes.INTEGER(4),
      defaultValue:0
    },
    college:{
      type : DataTypes.CHAR(4)
    },
    sex:{
      type : DataTypes.CHAR(2)
    },
    telephone:{
      type:DataTypes.CHAR(20)
    },
    credit:{
      type:DataTypes.INTEGER(11)
    },
    age:{
      type:DataTypes.INTEGER(4)
    },
    email:{
      type:DataTypes.CHAR(255)
    },
    ip:{
      type:DataTypes.STRING(20)
    },
  }, {
    timestamps: false,
    tableName: 'tbl_user',
    freezeTableName: true
  });
};
