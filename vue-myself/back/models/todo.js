module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    content: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    finish: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  });

  Todo.associate = (db) => {
    db.User.belongsTo(db.User);
  };
  return Todo;
};