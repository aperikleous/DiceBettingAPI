'use strict';

import {
  Model
} from 'sequelize';

interface UserAttributes {
  id: Number;
  name: string;
  balance: Number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes{
    id!: Number;
    name!: string;
    balance!: Number;
    
    static associate(models: any) {}
  };
  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};