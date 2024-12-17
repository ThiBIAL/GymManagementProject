import express from 'express';
import User from '../models/User.js';
import authenticateToken from '../middleware/authenticateToken.js';
import bcrypt from 'bcryptjs';

import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();

// Récupérer tous les utilisateurs (protection ajoutée)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Récupérer un utilisateur spécifique par ID (protection ajoutée)
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Modifier un utilisateur (nom, email, numéro, rôle, etc.) (protection ajoutée)
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { name, email, phoneNumber, role, password } = req.body;
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updatedFields = { name, email, phoneNumber, role };

        // Si un mot de passe est fourni, le hacher et l'ajouter aux champs à mettre à jour
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedFields.password = hashedPassword;
        }

        await user.update(updatedFields);
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Supprimer un utilisateur (protection ajoutée)
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Avatar
// Configuration de multer pour les uploads d'images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/avatar'); // Dossier où les fichiers seront enregistrés
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Only images are allowed');
        }
    },
});


export default router;
