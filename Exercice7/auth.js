const User = require('../models/User');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = "jesuissecret";


const generateToken = (_id) => {
	const token = JWT.sign({ _id }, JWT_SECRET, {
		expiresIn: '10h', // Durée de validité du token (10 heures dans cet exemple).
	});
	return token; // Retourne le token généré.
};


const login = async (req, res) => {
	try {
		const { email, password } = req.body; // Extraction des données du corps de la requête.
		const user = await User.findOne({ email }); // Recherche de l'utilisateur dans la base de données par email.

		if (!user) {
			// Si l'utilisateur n'existe pas, retourne une erreur 404.
			return res.status(404).json({ message: `Cet utilisateur n'existe pas` });
		}
		const isMatch = await bcrypt.compare(password, user.password); // Vérification du mot de passe.
		if (!isMatch) {
			// Si le mot de passe ne correspond pas, retourne une erreur 404.
			return res.status(404).json({ message: 'Email ou mot de passe incorrect' });
		}
		const token = generateToken(user._id); // Génération d'un token JWT pour l'utilisateur.
		res.cookie('jwt', token, {
			
			httpOnly: true, // Le cookie est accessible uniquement via le protocole HTTP (pas d'accès JavaScript).
		});
		res.status(200).json({ token }); // Retourne le token avec un code de succès 200.
	} catch (error) {
		// Retourne une erreur 500 avec un message d'erreur en cas de problème.
		res.status(500).json({ message: `Erreur lors de la connexion`, error });
	}
};

module.exports = generateToken(), login();
