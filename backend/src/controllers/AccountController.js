const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const User = require('../models/User');
require('dotenv/config');


module.exports = {

    /**
     * Efetua login do usuário na plataforma. 
     */
    async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!(email, password)) {
                return res.status(400).send({ message: 'All input is required. ' })
            } else {
                const user = await User.findOne({ where: { email: email } });
                if (!user) {
                    return res.status(422).send({ message: 'User not exist. ' })
                }
                else if (await bcrypt.compare(password, user.password)) {
                    const token = jwt.sign({
                        id: user.dataValues.id,
                        fullName: user.dataValues.fullName,
                        email: email,
                        password: user.dataValues.password
                    },
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: "1h",
                        }
                    );
                    // user
                    return res.status(200).json({ token: token });
                } else {
                    return res.status(401).send({ message: 'Authentication failure. ' })
                }
            }
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: error.message })
        }
    },
    /**
     * Registra o usuário
     */
    async register(req, res, next) {

        try {
            const { fullName, username, email, cellPhone, password } = req.body;

            const encryptedPassword = await bcrypt.hash(password, 10);

            if (!(fullName && username && email && cellPhone && password)) {
                return res.status(400).send({ message: "All input is required. " })
            }

            const user = await User.create({
                fullName, username, password: encryptedPassword,
                email, cellPhone, active: true
            })
            return res.status(201).send({
                userId: user.id,
                message: "User created successfully. "
            });
        } catch (error) {
            if (error instanceof Sequelize.UniqueConstraintError) {
                return res.status(409).send({ message: `${Object.keys(error.fields)} alredy existe.` })
            }
            return res.status(500).send({ message: error.message })
        }
    },
    /**
     * Cadastra os dados pessoais do usuário
     */
    async personalDataRegister(req, res, next) {

        try {
            const { nationality, cpf, rg, gender, maritalStatus,
                skinColor, schooling, monthlyIncome } = req.body;

            const user = await User.update({
                nationality, cpf, rg, gender, maritalStatus,
                skinColor, schooling, monthlyIncome
            },
                {
                    where: {
                        id: req.user.id
                    }
                }
            )
            return res.status(201).send({
                userId: user.id,
                message: "Registration completed successfully. "
            });

        } catch (error) {
            if (error instanceof Sequelize.UniqueConstraintError) {
                return res.status(409).send({ message: `${Object.keys(error.fields)} alredy existe.` })
            }
            console.log(error)
            return res.status(500).send({ message: "Error in database." })

        }
    },
    /**
     * Verifica se é o primeiro acesso do usuário
     */
    async checkFirstAccess(req, res, next) {

        try {
            const user = await User.findByPk(req.user.id)

            if (!user.dataValues.rg) {
                return res.status(200).send({
                    firstAccess: true
                });
            }
            return res.status(200).send({
                firstAccess: false
            });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Error in database." })

        }
    }
}