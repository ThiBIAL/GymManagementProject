import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import models from '../models/index.js';

const { User } = models;

const router = express.Router();

// Middleware de vérification du token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ error: 'No authorization header provided' });
  }

  const token = authHeader.split(' ')[1];  // Bearer token
  if (!token) {
    return res.status(403).json({ error: 'Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key');  // Replace with your secret
    req.user = decoded;  // Attach user info to the request object
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};


// Utilisez ce middleware pour les routes protégées
router.get('/protected-route', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Protected data', user: req.user });
});


// Route d'inscription (toujours disponible sans token)
router.post('/register', async (req, res) => {
    try {
        const { username, password, email, lastName, firstName, phoneNumber } = req.body;

        if (!username || !password || !email || !lastName || !firstName || !phoneNumber) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const role = username === 'root' ? 'admin' : 'member';

        const newUser = await User.create({
            username,
            password: hashedPassword,
            email,
            lastName,
            firstName,
            phoneNumber,
            role,
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Route de connexion (génère le token)
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        'your_secret_key',  // Utilisez votre clé secrète ici
        { expiresIn: '1h' }
      );
  
      // Envoie du token au frontend
      res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
      console.error('Error during login:', err.message);  // Ajouter ce log pour voir l'erreur complète
      res.status(500).json({ error: err.message });
    }
  });

router.get('/profile', verifyToken, async (req, res) => {
  try {
      const user = await User.findByPk(req.user.id, {
          attributes: { exclude: ['password'] }, // Exclure le mot de passe
      });
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({
          message: 'Welcome to your profile!',
          user, // Retourne les données complètes de l'utilisateur
      });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


router.get('/validate', verifyToken, async (req, res) => {
  try {
      const user = await User.findByPk(req.user.id, {
          attributes: { exclude: ['password'] }, // Exclure le mot de passe
      });
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({
          message: 'Token is valid',
          user, // Retourne les données complètes de l'utilisateur
      });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

export default router;
