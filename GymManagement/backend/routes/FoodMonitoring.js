import express from 'express';
import FoodMonitoring from '../models/FoodMonitoring.js';
import User from '../models/User.js'; // Importer le modèle `User`

const router = express.Router();

// Route pour ajouter un suivi alimentaire
router.post('/add', async (req, res) => {
  const { username, type, duration, allergy } = req.body;

  // Validation des champs nécessaires
  if (!username || !type || !duration) {
    return res.status(400).json({
      error: 'Username, type, and duration are required.',
    });
  }

  try {
    // Vérifiez si l'utilisateur existe dans la table `User` avec le `username`
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Créer le suivi alimentaire
    const foodMonitoring = await FoodMonitoring.create({
      username,  // Utiliser le `username` pour lier
      type,
      duration,
      allergy,
    });

    res.status(201).json({
      message: 'Food monitoring added successfully!',
      foodMonitoring,
    });
  } catch (error) {
    console.error('Error adding food monitoring:', error);
    res.status(500).json({ error: 'An error occurred while adding food monitoring.' });
  }
});

// Route pour récupérer les suivis alimentaires par `username`
router.get('/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Vérifier si l'utilisateur existe dans la table `User`
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Récupérer tous les suivis alimentaires associés à cet utilisateur
    const foodMonitorings = await FoodMonitoring.findAll({
      where: { username },
    });

    if (foodMonitorings.length === 0) {
      return res.status(404).json({ message: 'No food monitoring data found for this user.' });
    }

    res.status(200).json(foodMonitorings);
  } catch (error) {
    console.error('Error fetching food monitoring data:', error);
    res.status(500).json({ error: 'An error occurred while fetching food monitoring data.' });
  }
});

export default router;
