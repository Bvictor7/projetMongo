const mongoose = require('mongoose');
const User = require('../Exercice2/User'); 
const generateToken = require('../Exercice7/auth')

const register = async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
  }

  try {
    const newUser = await User.create({ name, email, password });
    const token = generateToken(newUser._id);


    res.status(201).json({ message: 'Utilisateur créé avec succès', token: token });
  } catch (err) {
    
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', err });
  }

}


module.exports = register;