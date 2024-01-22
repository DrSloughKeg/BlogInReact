module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define("Articles", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING(5000),
      allowNull: false,
    },
  });

  Article.associate = (models) => {
    Article.hasMany(models.Comments, { onDelete: "cascade" });
  };

  return Article;
};
