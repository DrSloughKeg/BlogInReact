module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comments", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    body: {
      type: DataTypes.STRING(5000),
      allowNull: false,
    },
  });

  return Comment;
};
