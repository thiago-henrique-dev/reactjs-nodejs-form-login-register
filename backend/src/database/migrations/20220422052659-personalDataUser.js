'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'nationality', { type: Sequelize.STRING(50), require: true })
    await queryInterface.addColumn('Users', 'cpf', { type: Sequelize.STRING(50), unique: true, require: true })
    await queryInterface.addColumn('Users', 'rg', { type: Sequelize.STRING(50), unique: true, require: true })
    await queryInterface.addColumn('Users', 'gender', { type: Sequelize.ENUM('masculino', 'feminino', 'LGBTQIA+') })
    await queryInterface.addColumn('Users', 'maritalStatus', { type: Sequelize.ENUM('solteiro', 'casado', 'divorciado', 'viúvo', 'união estável') })
    await queryInterface.addColumn('Users', 'skinColor', { type: Sequelize.ENUM('branca', 'preta', 'parda', 'Indígena', 'amarela') })
    await queryInterface.addColumn('Users', 'schooling', {
      type: Sequelize.ENUM('Fundamental - Incompleto', 'Fundamental - Completo', 'Médio - Incompleto',
        'Médio - Completo', 'Superior - Incompleto', 'Superior - Completo', 'Pós-graduação - Incompleto',
        'Pós-graduação - Completo')
    })
    await queryInterface.addColumn('Users', 'monthlyIncome', { type: Sequelize.STRING, require: true })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'nationality');
    await queryInterface.removeColumn('Users', 'cpf');
    await queryInterface.removeColumn('Users', 'rg');
    await queryInterface.removeColumn('Users', 'gender');
    await queryInterface.removeColumn('Users', 'maritalStatus');
    await queryInterface.removeColumn('Users', 'skinColor');
    await queryInterface.removeColumn('Users', 'schooling');
    await queryInterface.removeColumn('Users', 'monthlyIncome');
    await queryInterface.removeColumn('Users', 'active');
  }
};
