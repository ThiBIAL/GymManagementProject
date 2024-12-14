const router = express.Router();
import express from 'express';
import UserSubscription from '../models/UserSubscription.js';
import User from '../models/User.js';
import SubscriptionType from '../models/SubscriptionType.js';


// Get all user subscriptions
router.get('/', async (req, res) => {
    try {
        const subscriptions = await UserSubscription.findAll();
        res.status(200).json(subscriptions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a user subscription
router.post('/', async (req, res) => {
    const { userId, subscriptionTypeId, startDate, endDate } = req.body;

    try {
        // Trouver l'utilisateur et le type d'abonnement
        const user = await User.findByPk(userId);
        const subscriptionType = await SubscriptionType.findByPk(subscriptionTypeId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!subscriptionType) {
            return res.status(404).json({ error: 'Subscription type not found' });
        }

        // Créer l'abonnement
        const newSubscription = await UserSubscription.create({
            userId,
            subscriptionTypeId,
            startDate,
            endDate,
        });

        // Mettre à jour le champ abonnement de l'utilisateur
        await user.update({ abonnement: subscriptionType.name });

        res.status(201).json({
            message: 'User subscription created successfully',
            subscription: newSubscription,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Delete a user subscription
router.delete('/:id', async (req, res) => {
    try {
        const subscription = await UserSubscription.findByPk(req.params.id);
        if (!subscription) {
            return res.status(404).json({ error: 'User subscription not found' });
        }
        await subscription.destroy();
        res.status(200).json({ message: 'User subscription deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
