import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Member from './User.js'; // Import du modèle des membres
import User from './User.js';

const FoodMonitoring = sequelize.define('FoodMonitoring', {
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    allergy: {
        type: DataTypes.STRING,
        allowNull: true, // Facultatif si l'utilisateur n'a pas d'allergies
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User, // Table associée
            key: 'username', // Clé de référence dans la table `Member`
        },
        onDelete: 'CASCADE', // Supprime les enregistrements liés si un membre est supprimé
    },
}, {
    timestamps: true, // Inclut `createdAt` et `updatedAt`
});

// Déclaration de l'association
FoodMonitoring.belongsTo(Member, { foreignKey: 'username', targetKey: 'username', as: 'member' });

export default FoodMonitoring;
