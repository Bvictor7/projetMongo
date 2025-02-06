const mongoose = require('mongoose');
const User = require('../Exercice2/User'); 


const register = async (req, res) => {
  const { name, email, password } = req.body;

  console.log(`name : ${name} email : ${email} password : ${password}`);
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
  }

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', err });
  }

}


module.exports = register;