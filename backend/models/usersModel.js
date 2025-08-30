import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const User = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  wallet_address: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Cloudinary URL for screenshot'
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'users',
  timestamps: true,
  indexes: [
    { fields: ['email'] },
    { fields: ['status'] }
  ]
});

export default User;
