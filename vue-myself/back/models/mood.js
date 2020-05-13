module.exports = (sequelize, DataTypes) => {
  const Mood = sequelize.define('Mood', {
    awesome: {
      type: DataTypes.INTEGER(10),
      defaultValue: 0,
    },
    good: {
      type: DataTypes.INTEGER(10),
      defaultValue: 0,
    },
    okay: {
      type: DataTypes.INTEGER(10),
      defaultValue: 0,
    },
    depressed: {
      type: DataTypes.INTEGER(10),
      defaultValue: 0,
    },
    terrible: {
      type: DataTypes.INTEGER(10),
      defaultValue: 0,
    },
  },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  Mood.associate = (db) => {
    db.Mood.belongsTo(db.User);
  };
  return Mood;
};