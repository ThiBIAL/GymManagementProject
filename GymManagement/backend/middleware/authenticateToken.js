import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // "Bearer <token>"
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Remplacez 'your_secret_key' par votre clé secrète
    req.user = decoded; // Ajoute les informations du token décodé à l'objet `req`
    next(); // Passe au prochain middleware ou routeur
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

export default authenticateToken;
