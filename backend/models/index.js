// models/index.js
import sequelize from '../config/database.js';
import User from './usersModel.js';
import Admin from './adminModel.js';
import NewsLetter from './newsletterModel.js';
import ContactUs from './contactModel.js';
// Import other models here

// Define associations here if needed
// User.hasMany(SomeOtherModel);
// SomeOtherModel.belongsTo(User);

export {
  sequelize,
  User,
  Admin,
  NewsLetter,
  ContactUs,
  // Export other models here
};
