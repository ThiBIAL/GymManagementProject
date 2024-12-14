import express from 'express';
import User from '../models/User.js';
import authenticateToken from '../middleware/authenticateToken.js';

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
        const { name, email, phoneNumber, role } = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.update({ name, email, phoneNumber, role });
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

export default router;
