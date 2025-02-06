const User = require('../models/User');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET;


const generateToken = (_id) => {
	const token = JWT.sign({ _id }, JWT_SECRET, {
		expiresIn: '10h', // Durée de validité du token (10 heures dans cet exemple).
	});
	return token; // Retourne le token généré.
};


const auth = async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token manquant" });

    JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Token invalide" });
      req.user = user; 
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur s