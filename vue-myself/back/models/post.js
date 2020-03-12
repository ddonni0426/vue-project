module.exports = (sequelize, DataTypes) => {

  const Post = sequelize.define('Post', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    important:{
      type:DataTypes.BOOLEAN(),
      defaultValue: false
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  });

  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
  };
  return Post;
};