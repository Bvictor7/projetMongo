const mongoose = require('mongoose');
const User = require('../Exercice2/User'); 


// Récuperer les utilisateurs
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        message: `Erreur lors de la récupération des utilisateurs`,
        error,
      });
    }
  };

  module.exports = getAllUsers;
  