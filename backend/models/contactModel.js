// models/contactus.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js"

const ContactUs = sequelize.define(
  "ContactUs",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "contact_us",
    timestamps: true, // createdAt & updatedAt
  }
);

export default ContactUs;
