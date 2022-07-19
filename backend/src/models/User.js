const { Model, DataTypes } = require('sequelize')


class User extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            fullName: {
                type: DataTypes.STRING(100),
            },
            username: {
                type: DataTypes.STRING(100),
            },
            email: {
                type: DataTypes.STRING(100),
            },
            password: {
                type: DataTypes.STRING(100),
            },
            cellPhone: {
                type: DataTypes.STRING,
                validate: {
                    len: {
                        args: [
                            0,
                            11,
                        ],
                        msg: 'O celular está inválido!',
                    },
                },
            },
            nationality: { type: DataTypes.STRING(50), require: true },
            cpf: { type: DataTypes.STRING(50), require: true },
            rg: { type: DataTypes.STRING(50), unique: true, require: true },
            gender: { type: DataTypes.ENUM('masculino', 'feminino', 'Não informar. ') },
            maritalStatus: { type: DataTypes.ENUM('solteiro', 'casado', 'viuvo') },
            skinColor: { type: DataTypes.ENUM('branca', 'preta', 'parda', 'Indígena', 'amarela') },
            schooling: {
                type: DataTypes.ENUM('Fundamental - Incompleto', 'Fundamental - Completo', 'Médio - Incompleto',
                    'Médio - Completo', 'Superior - Incompleto', 'Superior - Completo', 'Pós-graduação - Incompleto',
                    'Pós-graduação - Completo'),
            },
            monthlyIncome: { type: DataTypes.DOUBLE, require: true },
            active: { type: DataTypes.BOOLEAN, defaultValue: 0, require: true }
        }, {
            sequelize
        })
    }
    static associate(models) { }
}

module.exports = User