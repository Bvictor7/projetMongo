const mongoose = require('mongoose');
const User = require('../Exercice2/User'); 

const removeUsers = async (req, res) => {  
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json({ message: "Utilisateur supprimé", user });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error: err.message });
    }
};

module.exports = removeUsers;  
