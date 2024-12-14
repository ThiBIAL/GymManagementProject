const router = express.Router();
import express from 'express';
import SubscriptionType from '../models/SubscriptionType.js';


// Get all subscription types
router.get('/', async (req, res) => {
    try {
        const types = await SubscriptionType.findAll();
        res.status(200).json(types);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a subscription type
router.post('/', async (req, res) => {
    const { name, description, price } = req.body;

    try {
        const newType = await SubscriptionType.create({ name, description, price });
        res.status(201).json({ message: 'Subscription type created successfully', type: newType });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a subscription type
router.put('/:id', async (req, res) => {
    const { name, description, price } = req.body;

    try {
        const type = await SubscriptionType.findByPk(req.params.id);

        if (!type) {
            return res.status(404).json({ error: 'Subscription type not found' });
        }

        // Update the subscription type
        await type.update({ name, description, price });
        res.status(200).json({ message: 'Subscription type updated successfully', type });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Delete a subscription type
router.delete('/:id', async (req, res) => {
    try {
        const type = await SubscriptionType.findByPk(req.params.id);
        if (!type) {
            return res.status(404).json({ error: 'Subscription type not found' });
        }
        await type.destroy();
        res.status(200).json({ message: 'Subscription type deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
