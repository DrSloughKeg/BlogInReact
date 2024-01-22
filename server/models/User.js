module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Articles, { onDelete: "cascade" });
  };

  User.associate = (models) => {
    User.hasMany(models.Comments, { onDelete: "cascade" });
  };
  return User;
};
