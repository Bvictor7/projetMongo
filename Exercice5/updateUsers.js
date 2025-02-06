const mongoose = require('mongoose');
const User = require('../Exercice2/User'); 

const updateUser = async (req, res) => {
    const { id } = req.params; 
    const newName = req.body.name;
    const  newPassword  = req.body.password; 

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { name: newName, password: newPassword }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json(updatedUser); 
    } catch (err) {
        res.status(500).json({ message: 'Erreur du serveur', error: err.message });
    }
};

module.exports = updateUser;
