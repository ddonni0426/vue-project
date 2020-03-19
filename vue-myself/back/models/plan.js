module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define('Plan', {
    startDay: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    endDay: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    startTime: {
      type: DataTypes.STRING(10),
      defaultValue: '00:00',
    },
    endTime: {
      type: DataTypes.STRING(10),
      defaultValue: '00:00',
    },
    plan: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  Plan.associate = (db) => {
    db.Plan.belongsTo(db.User);
  };
  return Plan;
};