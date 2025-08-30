import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Newsletter = sequelize.define('newsletter', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  status: {
    type: DataTypes.ENUM('active', 'unsubscribed'),
    defaultValue: 'active'
  },
  subscribed_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  unsubscribed_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'newsletters',
  indexes: [
    { fields: ['email'] },
    { fields: ['status'] }
  ]
});

export default Newsletter;
