'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      fullName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        require: true
      },
      username: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        require: true
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        require: true
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
        require: true
      },
      cellPhone: {
        type: Sequelize.STRING(17),
        unique: true,
        allowNull: false,
        require: true
      },
      active: {
        type: Sequelize.BOOLEAN,
        default: true,
        require: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};

